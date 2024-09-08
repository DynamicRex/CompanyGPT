# CompanyGPT Backend

This is the backend for CompanyGPT, an AI-powered enterprise platform that integrates with a company’s existing systems to provide insights and support via natural language queries. The backend is built using FastAPI and connects to MongoDB Atlas for database storage. Below are the setup instructions.

## Prerequisites

- Python 3.10 or later
- MongoDB Atlas (or local MongoDB instance)
- Anaconda (recommended for virtual environment management)
- Postman (for testing API endpoints)

## Features
 - API Endpoints for User Authentication 

## Setting up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a new account and set up a cluster.
   - Whitelist your IP address for access and create a database user with a username and password.
   - Obtain the MongoDB connection string from your Atlas dashboard.

2. **Configure MongoDB in the Backend**:
   - In `backend/utils/config.py`, set the `MONGO_DETAILS` connection string to the string obtained from MongoDB Atlas.
   - Ensure the database name is `CompanyGPT` and the `users` collection is used to store user data.

---

## Setting up the Backend

Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd CompanyGPT/backend

2. **Set Up Virtual Environment: Create a virtual environment using Anaconda and activate it:**

   ```bash
    conda create --name companygpt python=3.10
    conda activate companygpt
    Install Dependencies: Run the following command to install necessary Python packages:

3. **Install the Requirements**
   ```bash
    Copy code
    pip install -r requirements.txt
    Run the Backend: After configuring MongoDB and installing dependencies, you can run the FastAPI server with:

4. **RUn the Terminal**
   ```bash
    Copy code
    uvicorn backend.main:app --reload
    Test the API: Use Postman or navigate to http://127.0.0.1:8000/docs to view and test the interactive API documentation.

