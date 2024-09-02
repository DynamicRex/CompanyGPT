from fastapi import FastAPI
from backend.api.connectors import router as connectors_router

app = FastAPI()

app.include_router(connectors_router, prefix="/api")

@app.get("/")
async def read_root():
    return {"message": "Welcome to CompanyGPT API!"}
