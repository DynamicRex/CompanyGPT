import os
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId

# Existing configuration (for SQLite or other DB)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")

# MongoDB connection string (replace with your actual connection string)
MONGO_DETAILS = "mongodb+srv://visionroots0:OqGvDWGoEhosMs6L@companygpt.ls74t.mongodb.net/?retryWrites=true&w=majority&appName=CompanyGPT"

# MongoDB Client
client = AsyncIOMotorClient(MONGO_DETAILS)

# Access the specific database and collection
database = client["CompanyGPT"]  # Replace with your desired database name
users_collection = database.get_collection("users")  # "users" collection

# Ensure indexes (create if not exists)
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
