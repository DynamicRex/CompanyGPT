from fastapi import APIRouter, HTTPException
from backend.utils.config import users_collection
from bson import ObjectId

router = APIRouter()

# Existing API skeleton (to be fleshed out later)
@router.post("/signup")
def signup():
    return {"message": "User signed up"}

@router.post("/login")
def login():
    return {"message": "User logged in"}

@router.post("/logout")
def logout():
    return {"message": "User logged out"}

@router.get("/profile")
def profile():
    return {"message": "User profile"}

# Endpoint to test MongoDB connection
@router.get("/test-mongo")
async def test_mongo():
    try:
        # Replace with a valid ObjectId if you have any documents in your "users" collection
        user = await users_collection.find_one({"_id": ObjectId("60d6fe3db23bfb001cf72c2e")})
        if user:
            return {"message": "MongoDB connection is working!", "user": user}
        else:
            return {"message": "No user found."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
