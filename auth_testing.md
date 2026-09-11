# Auth Testing Playbook — Property Perfect

## Setup
- Admin credentials are seeded on backend startup from `/app/backend/.env` (ADMIN_EMAIL / ADMIN_PASSWORD) into the `users` collection with bcrypt hash.
- JWT access token (15 min) + refresh token (7 days) set as httpOnly, SameSite=None, Secure cookies.
- Brute force: 5 failed logins per ip:email = 15-minute lockout (`login_attempts` collection).

## Endpoints
- POST /api/auth/login {email, password} → sets cookies, returns user
- POST /api/auth/refresh → new access cookie
- POST /api/auth/logout → clears cookies
- GET /api/auth/me → current admin user
- GET /api/quote-requests → PROTECTED (admin cookie required)
- PATCH /api/quote-requests/{id}/status {"status": "new|contacted|scheduled|completed"} → PROTECTED
- POST /api/quote-requests → PUBLIC (stores submission + triggers owner email via managed Resend)

## Curl verification
```
API=https://work-order-hub-74.preview.emergentagent.com

# wrong password rejected
curl -s -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@propertyperfect.com","password":"wrong"}'

# correct login sets cookies
curl -s -c cookies.txt -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@propertyperfect.com","password":"PerfectAdmin2026!"}'

# me + protected inbox
curl -s -b cookies.txt $API/api/auth/me
curl -s -b cookies.txt $API/api/quote-requests

# unauthenticated inbox must 401
curl -s $API/api/quote-requests

# status update
curl -s -b cookies.txt -X PATCH $API/api/quote-requests/<id>/status -H "Content-Type: application/json" -d '{"status":"contacted"}'
```

## MongoDB verification
```
mongosh
use test_database
db.users.find({role:"admin"}).pretty()   # password_hash starts with $2b$
db.login_attempts.find().pretty()
```
