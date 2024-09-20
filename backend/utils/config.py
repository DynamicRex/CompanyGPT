import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from datetime import timedelta

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Existing configuration
DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"  # HMAC SHA-256 algorithm for JWT
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

# MongoDB connection
MONGO_DETAILS = os.getenv("MONGO_DETAILS")
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["CompanyGPT"]
users_collection = database.get_collection("users")

# Ensure indexes
users_collection.create_index("email", unique=True)
users_collection.create_index("company_id")

# Helper function to format MongoDB documents
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "password_hash": user["password_hash"],
        "role": user.get("role", "user"),  # Default role is "user"
        "company_id": str(user.get("company_id")),
        "created_by": str(user.get("created_by", None)),  # Only present for non-superusers
        "company_name": user.get("company_name", None),
        "company_address": user.get("company_address", None),
        "industry_type": user.get("industry_type", None),
        "number_of_employees": user.get("number_of_employees", None),
        "created_at": user["created_at"],
        "updated_at": user["updated_at"],
        "last_login": user.get("last_login", None)
    }
