from fastapi import APIRouter

router = APIRouter()

@router.get("/faq")
def get_faq():
    return {"message": "FAQ list"}

@router.post("/contact")
def contact_support():
    return {"message": "Support contacted"}
