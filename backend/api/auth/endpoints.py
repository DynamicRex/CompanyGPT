# backend/api/auth/endpoints.py

from fastapi import APIRouter, HTTPException, Body, Depends
from backend.utils.config import users_collection, ACCESS_TOKEN_EXPIRE_MINUTES
from backend.utils.security import create_access_token
from passlib.context import CryptContext
from pydantic import EmailStr
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import uuid

router = APIRouter()

# Password encryption context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Helper function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Helper function to verify passwords
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Superuser Signup Endpoint
@router.post("/signup")
async def signup(full_name: str = Body(...), email: EmailStr = Body(...), password: str = Body(...),
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
                   email: EmailStr = Body(...), password: str = Body(...)):
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

# Login Endpoint
@router.post("/login")
async def login(email: EmailStr = Body(...), password: str = Body(...)):
    # Check if user exists
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Create JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
