import os
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId

# Existing configuration (for SQLite or other DB)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")

# New MongoDB configuration
MONGO_DETAILS = "mongodb+srv://visionroots0:OqGvDWGoEhosMs6L@companygpt.ls74t.mongodb.net/?retryWrites=true&w=majority&appName=CompanyGPT"

# MongoDB Client
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client["CompanyGPT"]  # Replace with your desired database name
users_collection = database.get_collection("users")  # "users" collection

# Helper functions to format MongoDB documents
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "company_name": user["company_name"],
        "company_address": user["company_address"],
        "industry_type": user["industry_type"],
        "number_of_employees": user["number_of_employees"],
        "created_at": user["created_at"]
    }
