from fastapi import APIRouter, HTTPException, Path
from typing import Dict
from uuid import uuid4

router = APIRouter()

# In-memory storage for reports (this simulates a database)
reports: Dict[str, Dict] = {}

@router.post("/")
def generate_report():
    """
    Simulates report creation and generates a unique ID for the report.
    """
    # Generate a unique ID for the report using uuid4 (a universally unique identifier)
    report_id = str(uuid4())
    
    # Simulate saving the report with the generated ID
    reports[report_id] = {"id": report_id, "content": "This is a sample report"}
    
    return {"id": report_id, "message": "Report generated"}

@router.get("/{id}")
def get_report(id: str = Path(..., description="The ID of the report to retrieve")):
    """
    Retrieves a report by its ID. The ID must be valid.
    """
    # Retrieve the report from the in-memory storage
    report = reports.get(id)
    
    if report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    
    return {"id": id, "report": report}
