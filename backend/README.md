# CompanyGPT Backend

This is the backend for **CompanyGPT**, an AI-powered enterprise platform that integrates with a company’s existing systems (like ERPs) to provide insights and support via natural language queries. The backend is built using **FastAPI** and connects to **MongoDB** for database storage, with a future AI model integration using **PyTorch**.

## Technology Stack

- **Programming Language**: Python 3.10
- **Framework**: FastAPI (for building high-performance APIs)
- **Database**: MongoDB (using Motor for async operations)
- **AI Model**: PyTorch (for future AI integration)
- **Authentication**: JWT (for stateless authentication)
- **Password Hashing**: bcrypt (via passlib)
- **Caching**: Redis (planned for frequent data caching)
- **Token Management**: JOSE (for JWT token handling)
- **Deployment Tools**: Uvicorn (ASGI server) and Docker (for containerization)
- **Testing**: Postman (for manual API testing)
- **Environment Configuration**: dotenv (for managing sensitive configuration variables)

## Prerequisites

- Python 3.10 or later
- MongoDB Atlas (or a local MongoDB instance)
- Anaconda (recommended for virtual environment management)
- Postman (for testing API endpoints)

## Features

- **User Authentication**: Secure user signup, login, and JWT-based route protection.
- **Superuser Management**: Superusers can manage regular users within their company.
- **Profile Management**: Both superusers and regular users can update their profiles.
- **Protected Routes**: JWT-secured API endpoints.
- **Error Handling Middleware**: Centralized error handling for consistent responses.
- **Logging Middleware**: Tracks and logs requests and responses.

---

## Directory Structure

Here’s a brief explanation of the key files and directories in the backend:

 D:.
│   Dockerfile                # Docker configuration for containerization.
│   main.py                   # Main entry point for running the FastAPI server.
│   README.md                 # Documentation for the backend directory.
│   requirements.txt          # Python dependencies required for the backend.
│
├───api                       # Contains all API-related code.
│   │   middleware.py         # JWT validation, error handling, and logging middleware.
│   │   __init__.py           # Initialization file for the API package.
│   │
│   ├───auth                  # Handles user authentication and authorization.
│   │   │   endpoints.py      # Contains endpoints for user signup, login, and profile management.
│   │   │   __init__.py       # Initialization file for the auth module.
│   │
│   ├───connectors            # Integrates with external systems like Zoho (e.g., Zoho API).
│   │   │   zoho_connector.py # Code to connect and interact with Zoho's API.
│   │   │   __init__.py       # Initialization file for the connectors module.
│   │
│   ├───erp                   # Handles interactions with ERP systems (future development).
│   │   │   endpoints.py      # Placeholder for ERP-related endpoints.
│   │   │   __init__.py       # Initialization file for the ERP module.
│   │
│   ├───query                 # Query translation and execution (future AI-related work).
│   │   │   endpoints.py      # Placeholder for query-related endpoints.
│   │   │   query_translation.py # Contains logic for translating natural language queries.
│   │   │   __init__.py       # Initialization file for the query module.
│   │
│   ├───report                # Reporting endpoints (future feature for generating reports).
│   │   │   endpoints.py      # Placeholder for report-related endpoints.
│   │   │   __init__.py       # Initialization file for the report module.
│   │
│   ├───support               # Support-related endpoints (future development).
│   │   │   endpoints.py      # Placeholder for support-related endpoints.
│   │   │   __init__.py       # Initialization file for the support module.
│   │
│   └───__pycache__           # Python bytecode cache (auto-generated).
│
├───models                    # AI model integration (future development).
│   │   llama_model.py        # Placeholder for the AI model integration.
│   │   __init__.py           # Initialization file for the models module.
│
├───tests                     # Test scripts for backend functionality.
│   │   test_connectors.py    # Test cases for connectors (e.g., Zoho API).
│   │   test_models.py        # Test cases for AI model integration (future work).
│   │   __init__.py           # Initialization file for the tests module.
│
├───utils                     # Utility functions for config, logging, and security.
│   │   config.py             # Contains MongoDB connection configuration and environment variables.
│   │   logging.py            # Custom logging configuration (planned feature).
│   │   security.py           # Helper functions for JWT token management and password hashing.
│   │   __init__.py           # Initialization file for the utils module.
│
└───__pycache__               # Python bytecode cache (auto-generated).



### Key Files & Folders Explained:

1. **`main.py`**:
   - This is the entry point of the FastAPI application. It contains the main server logic and runs the Uvicorn server.

2. **`api/`**:
   - This directory contains the main API endpoints for different functionalities like user authentication, connectors (e.g., Zoho), and future modules such as query handling, reporting, and support.

   - **`api/auth/`**:
     - Contains endpoints for user authentication (`endpoints.py`), handling signup, login, and profile management for both superusers and regular users.

   - **`api/connectors/`**:
     - Contains integration logic for external systems like Zoho. For now, it contains the `zoho_connector.py` file which handles interaction with the Zoho API.

   - **`api/middleware.py`**:
     - Middleware for handling JWT validation, logging requests and responses, and catching errors consistently across the application.

3. **`models/`**:
   - Contains the placeholder for the **PyTorch** AI model (`llama_model.py`) that will be integrated in the future to provide company insights via natural language processing.

4. **`utils/`**:
   - Contains utility scripts:
     - **`config.py`**: Handles the MongoDB connection details and environment variables.
     - **`logging.py`**: Will contain custom logging configuration for tracking key events and system health.
     - **`security.py`**: Manages password hashing (bcrypt) and JWT token creation/validation using JOSE.

5. **`tests/`**:
   - Contains test scripts for various modules (connectors, models, etc.). These will be expanded as the project grows to ensure robust testing of the system.

---

## Setting up MongoDB Atlas

1. **Create MongoDB Atlas Account**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new account.
   - Set up a cluster, whitelist your IP, and create a database user.
   - Obtain the MongoDB connection string from the Atlas dashboard.

2. **Configure MongoDB in the Backend**:
   - In `backend/utils/config.py`, set the `MONGO_DETAILS` connection string to the MongoDB connection string from your Atlas account.
   - The database name is `CompanyGPT` and the `users` collection is used to store user data.

---

## Setting up the Backend

### Installation Steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd CompanyGPT/backend


### Setting up the Backend


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


## Next Steps
1. **Integrate Redis:**
Future implementation will include caching frequent data using Redis for faster response times.

2. **AI Integration:**
Work on integrating the PyTorch-based AI model to process natural language queries and provide company insights.

3. **Deployment:**
In the future, the backend will be containerized with Docker and served using NGINX in a production environment.

