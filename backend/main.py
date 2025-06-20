# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware

from backend.api.auth.endpoints import router as auth_router
from backend.api.query.endpoints import router as query_router
from backend.api.report.endpoints import router as report_router
from backend.api.erp.endpoints import router as erp_router
from backend.api.support.endpoints import router as support_router
from backend.api.middleware import JWTAuthMiddleware
from backend.utils.logging import logger  # Import the logger setup

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Add JWT Authentication Middleware
app.add_middleware(JWTAuthMiddleware)

# Include your API routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(query_router, prefix="/query", tags=["Query"])
app.include_router(report_router, prefix="/report", tags=["Report"])
app.include_router(erp_router, prefix="/erp", tags=["ERP"])
app.include_router(support_router, prefix="/support", tags=["Support"])

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")  # Log when root endpoint is accessed
    return {"message": "Welcome to CompanyGPT API"}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting the FastAPI application")  # Log when the app starts
    uvicorn.run(app, host="0.0.0.0", port=8000)
