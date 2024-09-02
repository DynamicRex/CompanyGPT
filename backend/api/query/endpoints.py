from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def post_query():
    return {"message": "Query received"}

@router.get("/history")
def query_history():
    return {"message": "Query history"}
