# backend/api/connectors/__init__.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/example")
def get_example():
    return {"message": "This is an example endpoint"}
