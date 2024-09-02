from fastapi import APIRouter

router = APIRouter()

@router.post("/connect")
def connect_erp():
    return {"message": "ERP connected"}

@router.get("/status")
def erp_status():
    return {"message": "ERP status"}
