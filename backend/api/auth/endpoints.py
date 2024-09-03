from fastapi import APIRouter

router = APIRouter()

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
