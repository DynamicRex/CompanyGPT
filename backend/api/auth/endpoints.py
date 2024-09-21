from fastapi import APIRouter, HTTPException, Body, Depends
from backend.utils.config import users_collection, ACCESS_TOKEN_EXPIRE_MINUTES
from backend.utils.security import create_access_token, verify_token, hash_password, verify_password
from backend.utils.logging import logger  # Import the logger
from fastapi.security import OAuth2PasswordBearer
from pydantic import EmailStr, BaseModel
from datetime import datetime, timedelta
from bson import ObjectId
import uuid

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

router = APIRouter()

# Helper function to get the current authenticated user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    email = verify_token(token)
    if email is None:
        logger.warning("Invalid or expired token used")
        raise HTTPException(status_code=401, detail="Invalid token or token expired")
    
    # Check if the user exists in the database
    user = await users_collection.find_one({"email": email})
    if not user:
        logger.warning(f"Invalid token for non-existing user: {email}")
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

# Superuser Signup Endpoint
@router.post("/signup")
async def signup(full_name: str = Body(...), email: EmailStr = Body(...), password: str = Body(...),
                 company_name: str = Body(...), company_address: str = Body(...),
                 industry_type: str = Body(...), number_of_employees: int = Body(...)):
    # Check if the user already exists
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        logger.warning(f"Signup failed: User with email {email} already exists")
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
    logger.info(f"Superuser account created for {email}")

    return {"message": "Superuser account created successfully", "user_id": superuser_id}

# Regular User Creation by Superuser
@router.post("/add-user")
async def add_user(superuser_id: str = Body(...), full_name: str = Body(...),
                   email: EmailStr = Body(...), password: str = Body(...)):
    # Check if superuser exists (now handling superuser_id as a string, not ObjectId)
    superuser = await users_collection.find_one({"_id": superuser_id, "role": "superuser"})
    if not superuser:
        logger.warning(f"Superuser with ID {superuser_id} not found")
        raise HTTPException(status_code=400, detail="Superuser not found.")

    # Check if the user already exists
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        logger.warning(f"User creation failed: Email {email} already exists")
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
    logger.info(f"User account created for {email} by superuser {superuser_id}")

    return {"message": "User account created successfully", "user_id": str(user_data["_id"])}

# Login Endpoint
@router.post("/login")
async def login(email: EmailStr = Body(...), password: str = Body(...)):
    # Check if user exists
    user = await users_collection.find_one({"email": email})
    if not user:
        logger.warning(f"Login failed: Invalid email {email}")
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(password, user["password_hash"]):
        logger.warning(f"Login failed: Incorrect password for {email}")
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Create JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    
    logger.info(f"User {email} logged in successfully")
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "role": user["role"]  # Include role in the response
    }

# Protected Route Example
@router.get("/protected-route")
async def protected_route(current_user: dict = Depends(get_current_user)):
    logger.info(f"Protected route accessed by {current_user['full_name']}")
    return {"message": f"Hello, {current_user['full_name']}. This is a protected route."}

# Logout Endpoint (Client-side token removal)
@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Logout simply invalidates the token on the client side.
    The client should remove the token from storage (e.g., local storage, cookies).
    """
    logger.info(f"User {current_user['full_name']} logged out")
    return {"message": f"Goodbye, {current_user['full_name']}. Token should be removed client-side."}

# Update Superuser Profile
class SuperuserProfileUpdate(BaseModel):
    full_name: str = None
    password: str = None
    company_name: str = None
    company_address: str = None
    industry_type: str = None
    number_of_employees: int = None

@router.put("/update-profile/superuser")
async def update_superuser_profile(
    updates: SuperuserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    # Ensure the user is a superuser
    if current_user['role'] != "superuser":
        logger.warning(f"Unauthorized attempt to update superuser profile by {current_user['email']}")
        raise HTTPException(status_code=403, detail="Only superusers can update this profile")

    update_data = {}

    # Update fields if provided
    if updates.full_name:
        update_data["full_name"] = updates.full_name
    if updates.password:
        update_data["password_hash"] = hash_password(updates.password)  # Rehash password
    if updates.company_name:
        update_data["company_name"] = updates.company_name
    if updates.company_address:
        update_data["company_address"] = updates.company_address
    if updates.industry_type:
        update_data["industry_type"] = updates.industry_type
    if updates.number_of_employees is not None:
        update_data["number_of_employees"] = updates.number_of_employees

    # Check if _id is a valid ObjectId, otherwise treat it as a string
    user_id = current_user["_id"]
    try:
        user_id = ObjectId(user_id)  # Convert to ObjectId if valid
    except:
        pass  # Keep it as a string if not a valid ObjectId

    # Update the user document in MongoDB
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await users_collection.update_one({"_id": user_id}, {"$set": update_data})
        logger.info(f"Superuser {current_user['email']} updated profile successfully")
        return {"message": "Superuser profile updated successfully"}

    return {"message": "No fields to update"}

# Update Regular User Profile
class UserProfileUpdate(BaseModel):
    full_name: str = None
    password: str = None

@router.put("/update-profile/user")
async def update_user_profile(
    updates: UserProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    # Ensure the user is a regular user
    if current_user['role'] != "user":
        logger.warning(f"Unauthorized attempt to update regular user profile by {current_user['email']}")
        raise HTTPException(status_code=403, detail="Only regular users can update this profile")

    update_data = {}

    # Update fields if provided
    if updates.full_name:
        update_data["full_name"] = updates.full_name
    if updates.password:
        update_data["password_hash"] = hash_password(updates.password)  # Rehash password

    # Check if _id is a valid ObjectId, otherwise treat it as a string
    user_id = current_user["_id"]
    try:
        user_id = ObjectId(user_id)  # Convert to ObjectId if valid
    except:
        pass  # Keep it as a string if not a valid ObjectId

    # Update the user document in MongoDB
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        await users_collection.update_one({"_id": user_id}, {"$set": update_data})
        logger.info(f"Regular user {current_user['email']} updated profile successfully")
        return {"message": "User profile updated successfully"}

    return {"message": "No fields to update"}
