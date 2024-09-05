# backend/api/auth/endpoints.py

from fastapi import APIRouter, HTTPException, Body
from backend.utils.config import users_collection
from bson.objectid import ObjectId
from passlib.context import CryptContext
from datetime import datetime
import uuid

router = APIRouter()

# Password encryption context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Helper function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Superuser Signup Endpoint
@router.post("/signup")
async def signup(full_name: str = Body(...), email: str = Body(...), password: str = Body(...),
                 company_name: str = Body(...), company_address: str = Body(...),
                 industry_type: str = Body(...), number_of_employees: int = Body(...)):

    # Check if the user already exists
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    
    # Hash the password
    password_hash = hash_password(password)

    # Create the superuser document
    superuser_id = str(uuid.uuid4())  # Unique ID for superuser
    superuser_data = {
        "_id": superuser_id,  # Unique ID for the superuser (used as company_id)
        "full_name": full_name,
        "email": email,
        "password_hash": password_hash,
        "role": "superuser",  # Role is set to superuser
        "company_id": superuser_id,  # Use the same _id as company_id
        "company_name": company_name,
        "company_address": company_address,
        "industry_type": industry_type,
        "number_of_employees": number_of_employees,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "last_login": None
    }

    # Insert the superuser into MongoDB
    await users_collection.insert_one(superuser_data)

    return {"message": "Superuser account created successfully", "user_id": superuser_id}

# Regular User Creation by Superuser
@router.post("/add-user")
async def add_user(superuser_id: str = Body(...), full_name: str = Body(...),
                   email: str = Body(...), password: str = Body(...)):

    # Check if superuser exists (now handling superuser_id as a string, not ObjectId)
    superuser = await users_collection.find_one({"_id": superuser_id, "role": "superuser"})
    if not superuser:
        raise HTTPException(status_code=400, detail="Superuser not found.")

    # Check if the user already exists
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists.")

    # Hash the password
    password_hash = hash_password(password)

    # Create the regular user document
    user_data = {
        "_id": str(uuid.uuid4()),  # Unique ID
        "full_name": full_name,
        "email": email,
        "password_hash": password_hash,
        "role": "user",  # Regular user role
        "company_id": superuser["company_id"],  # Link to the superuser's company
        "created_by": str(superuser["_id"]),  # Superuser who created this account
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "last_login": None
    }

    # Insert the regular user into MongoDB
    await users_collection.insert_one(user_data)

    return {"message": "User account created successfully", "user_id": str(user_data["_id"])}
