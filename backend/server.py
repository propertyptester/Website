from fastapi import FastAPI, APIRouter, Request, Response, Depends, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator
from typing import Annotated
import os
import re
import ipaddress
import logging
import bcrypt
import jwt
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ['JWT_SECRET']
OWNER_EMAIL = os.environ['OWNER_EMAIL']
VALID_STATUSES = {"new", "contacted", "scheduled", "completed"}

# --- Emergent managed email (Resend proxy) ---
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# --- Auth helpers ---
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except ValueError:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email,
               "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    try:
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    except Exception:
        user = None
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user["id"] = str(user.pop("_id"))
    user.pop("password_hash", None)
    return user


# --- Models ---
PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v))]


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=40)
    customer_type: str = Field(min_length=1, max_length=60)
    service: str = Field(min_length=1, max_length=120)
    request_type: str = "quote"
    city: str = Field(default="", max_length=120)
    urgency: str = Field(default="flexible", max_length=40)
    message: str = Field(min_length=1, max_length=4000)
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    def to_mongo(self):
        doc = self.model_dump(by_alias=True)
        doc["created_at"] = doc["created_at"].isoformat()
        return doc

    @staticmethod
    def from_mongo(doc):
        doc = dict(doc)
        doc["id"] = str(doc.pop("_id", ""))
        return QuoteRequest(**doc)


class LoginBody(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


class StatusBody(BaseModel):
    status: str


# --- Public routes ---
@api_router.get("/")
async def root():
    return {"message": "Property Perfect API is live"}


def _quote_email_html(q: QuoteRequest) -> str:
    label = "Work order" if q.request_type == "work-order" else "Quote request"
    ref = f"PP-{q.id[-6:].upper()}"
    rows = [
        ("Reference", ref),
        ("Type", label),
        ("Service", q.service),
        ("Customer type", q.customer_type),
        ("Name", q.name),
        ("Phone", q.phone),
        ("Email", q.email),
        ("City", q.city or "Not provided"),
        ("Urgency", q.urgency),
    ]
    trs = "".join(
        f'<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#48645B;font-family:Arial,sans-serif">{escape(k)}</td>'
        f'<td style="padding:6px 0;font-size:13px;color:#0E241F;font-family:Arial,sans-serif"><strong>{escape(v)}</strong></td></tr>'
        for k, v in rows
    )
    return (
        f'<table role="presentation" width="100%" style="background:#F3EBDC;padding:24px">'
        f'<tr><td><table role="presentation" width="100%" style="max-width:560px;background:#FBF6ED;border-radius:12px">'
        f'<tr><td style="padding:24px">'
        f'<p style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#0C5B47;font-family:Arial,sans-serif">{escape(EMAIL_FROM_NAME)}</p>'
        f'<p style="margin:0 0 18px;font-size:13px;color:#48645B;font-family:Arial,sans-serif">A new request just came in through the website.</p>'
        f'<table role="presentation" width="100%" style="border-top:2px solid #C9F2DF">{trs}'
        f'<tr><td style="padding:14px 12px 4px 0;font-size:13px;color:#48645B;font-family:Arial,sans-serif;vertical-align:top">Message</td>'
        f'<td style="padding:14px 0 4px;font-size:13px;color:#0E241F;font-family:Arial,sans-serif">{escape(q.message)}</td></tr>'
        f'</table>'
        f'<p style="margin:18px 0 0;font-size:12px;color:#888;font-family:Arial,sans-serif">Sent by {escape(EMAIL_FROM_NAME)}. We never ask for your password or card details by email.</p>'
        f'</td></tr></table></td></tr></table>'
    )


@api_router.post("/quote-requests")
async def create_quote_request(payload: QuoteRequest):
    if payload.request_type not in ("quote", "work-order"):
        payload.request_type = "quote"
    doc = payload.to_mongo()
    await db.quote_requests.insert_one(doc)
    logging.info(f"Quote request saved: {payload.id} ({payload.request_type})")
    label = "work order" if payload.request_type == "work-order" else "quote request"
    subject = f"New {label}: {payload.name} — {payload.service}"
    try:
        email_id = await send_email(to=OWNER_EMAIL, subject=subject, html=_quote_email_html(payload))
        logging.info(f"Owner alert email sent: {email_id}")
    except Exception as e:
        logging.error(f"Owner alert email could not be sent: {str(e)}")
    return {
        "success": True,
        "id": payload.id,
        "request_type": payload.request_type,
        "message": "Request received — our crew coordinator will reach out within one business day.",
    }


# --- Auth routes ---
@api_router.post("/auth/login")
async def auth_login(body: LoginBody, request: Request, response: Response):
    email = body.email.strip().lower()
    identifier = f"{request.client.host if request.client else 'unknown'}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    now = datetime.now(timezone.utc)
    if attempt and attempt.get("count", 0) >= 5:
        locked_until = attempt.get("locked_until")
        if locked_until and now < locked_until:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        await db.login_attempts.delete_one({"identifier": identifier})
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": now + timedelta(minutes=15),
                                             "updated_at": now.isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await db.login_attempts.delete_one({"identifier": identifier})
    access = create_access_token(str(user["_id"]), email)
    refresh = create_refresh_token(str(user["_id"]))
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True,
                        samesite="none", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh, httponly=True, secure=True,
                        samesite="none", max_age=604800, path="/")
    return {"id": str(user["_id"]), "email": email, "role": user.get("role", "admin")}


@api_router.post("/auth/refresh")
async def auth_refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    access = create_access_token(str(user["_id"]), user["email"])
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True,
                        samesite="none", max_age=900, path="/")
    return {"success": True}


@api_router.post("/auth/logout")
async def auth_logout(response: Response):
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"success": True}


@api_router.get("/auth/me")
async def auth_me(user: dict = Depends(get_current_user)):
    return user


# --- Admin-protected quote inbox ---
@api_router.get("/quote-requests")
async def list_quote_requests(user: dict = Depends(get_current_user)):
    docs = await db.quote_requests.find().sort("created_at", -1).to_list(100)
    return [QuoteRequest.from_mongo(d).model_dump() for d in docs]


def _status_email_html(name: str, line: str, service: str, ref: str, label: str) -> str:
    return (
        f'<table role="presentation" width="100%" style="background:#F3EBDC;padding:24px">'
        f'<tr><td><table role="presentation" width="100%" style="max-width:560px;background:#FBF6ED;border-radius:12px">'
        f'<tr><td style="padding:24px">'
        f'<p style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#0C5B47;font-family:Arial,sans-serif">{escape(EMAIL_FROM_NAME)}</p>'
        f'<p style="margin:0 0 18px;font-size:13px;color:#48645B;font-family:Arial,sans-serif">Update on your {escape(label)} ({escape(ref)})</p>'
        f'<p style="margin:0 0 12px;font-size:14px;color:#0E241F;font-family:Arial,sans-serif">Hi {escape(name)},</p>'
        f'<p style="margin:0 0 12px;font-size:14px;color:#0E241F;font-family:Arial,sans-serif">Your {escape(label)} for <strong>{escape(service)}</strong> {line}</p>'
        f'<p style="margin:0 0 18px;font-size:14px;color:#0E241F;font-family:Arial,sans-serif">Reference: <strong>{escape(ref)}</strong></p>'
        f'<p style="margin:0;font-size:12px;color:#888;font-family:Arial,sans-serif">Sent by {escape(EMAIL_FROM_NAME)}. We never ask for your password or card details by email.</p>'
        f'</td></tr></table></td></tr></table>'
    )


@api_router.patch("/quote-requests/{req_id}/status")
async def update_quote_status(req_id: str, body: StatusBody, user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(req_id):
        raise HTTPException(status_code=400, detail="Invalid request id")
    if body.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    existing = await db.quote_requests.find_one({"_id": req_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Request not found")
    previous = existing.get("status", "new")
    result = await db.quote_requests.update_one(
        {"_id": req_id}, {"$set": {"status": body.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    if body.status in ("scheduled", "completed") and previous != body.status:
        req = QuoteRequest.from_mongo(existing)
        label = "work order" if req.request_type == "work-order" else "quote request"
        ref = f"PP-{req.id[-6:].upper()}"
        if body.status == "scheduled":
            subject = f"Your Property Perfect {label} is scheduled"
            line = ("has been <strong>scheduled</strong>. Our crew has you on the calendar, "
                    "and we will confirm arrival details as the date gets close.")
        else:
            subject = f"Your Property Perfect {label} is complete"
            line = ("has been <strong>completed</strong>. Thank you for trusting Property Perfect "
                    "with your property — if anything else needs handling, one call does it.")
        try:
            email_id = await send_email(to=req.email, subject=subject,
                                        html=_status_email_html(req.name, line, req.service, ref, label))
            logging.info(f"Customer status email sent ({body.status}): {email_id}")
        except Exception as e:
            logging.error(f"Customer status email failed: {str(e)}")
    return {"success": True, "id": req_id, "status": body.status}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    admin_email = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "")
    if admin_email and admin_password:
        existing = await db.users.find_one({"email": admin_email})
        hashed = hash_password(admin_password)
        if existing is None:
            await db.users.insert_one({
                "email": admin_email,
                "password_hash": hashed,
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            logger.info(f"Admin user seeded: {admin_email}")
        elif not verify_password(admin_password, existing["password_hash"]):
            await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hashed}})
            logger.info(f"Admin password updated from env: {admin_email}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
