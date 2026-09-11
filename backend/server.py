from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator
from typing import Annotated
import os
import logging
from pathlib import Path
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

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


@api_router.get("/")
async def root():
    return {"message": "Property Perfect API is live"}


@api_router.post("/quote-requests")
async def create_quote_request(payload: QuoteRequest):
    if payload.request_type not in ("quote", "work-order"):
        payload.request_type = "quote"
    doc = payload.to_mongo()
    await db.quote_requests.insert_one(doc)
    logging.info(f"Quote request saved: {payload.id} ({payload.request_type})")
    return {
        "success": True,
        "id": payload.id,
        "request_type": payload.request_type,
        "message": "Request received — our crew coordinator will reach out within one business day.",
    }


@api_router.get("/quote-requests")
async def list_quote_requests():
    docs = await db.quote_requests.find().sort("created_at", -1).to_list(100)
    return [QuoteRequest.from_mongo(d).model_dump() for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
