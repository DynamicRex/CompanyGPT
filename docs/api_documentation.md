# API Documentation

This document provides an overview of the key API endpoints for the backend of CompanyGPT. The endpoints cover user authentication, superuser creation, and the management of regular users within a company.

### Base URL:
http://127.0.0.1:8000

## **Authentication Endpoints**

1. **Superuser Sign-Up Endpoint**
    - URL: `/auth/signup`  
    - Method:** `POST`  
    - Description:** This endpoint allows the creation of a superuser (the primary user for a company). The superuser can later add regular users to their company.

   ### **Request Body:**
   {
   "full_name": "John Doe",
   "email": "john.doe@example.com",
   "password": "StrongPassword123!",
   "company_name": "Acme Inc",
   "company_address": "123 Main St, San Francisco, CA",
   "industry_type": "Technology",
   "number_of_employees": 50
   }
   
   ### **Response:**
   {
   "message": "Superuser account created successfully",
   "user_id": "93734e81-7048-4a55-85ba-202fe222b18a"
   }
   
   ### **Possible Error Responses:**
   400 Bad Request: User with the provided email already exists.
   422 Unprocessable Entity: Invalid input (e.g., incorrect email format, weak password).


2. **Add User (By Superuser) Endpoint**
    - URL:** /auth/add-user
    - Method:** POST
    - Description:** Allows a superuser to add regular users to their company. Each user must have a unique email address

   ### **Request Body**
   {
   "superuser_id": "93734e81-7048-4a55-85ba-202fe222b18a",
   "full_name": "Jane Smith",
   "email": "jane.smith@example.com",
   "password": "Password123!"
   }
   ### **Response**
   {
   "message": "User account created successfully",
   "user_id": "8f5dc7d2-bb2d-4343-8433-a3d7aecbcbfd"
   }


3. **Login Endpoint (Superuser & Regular User)**
    - URL: /auth/login
    - Method: POST
    - Description: This endpoint allows both superusers and regular users to log in. Upon successful login, a JWT token is returned, which is used for future authenticated requests.

   ### **Request Body**
   {
   "email": "john.doe@example.com",
   "password": "StrongPassword123!"
   }

   ### **Response**
   {
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   "token_type": "bearer"
   }

   **Possible Error Responses:**  
     400 Bad Request: Invalid email or password.


4. **Logout Endpoint**
    - URL: /auth/logout
    - Method: POST
    - Description: This endpoint handles client-side token removal. It instructs the client to remove the JWT token (e.g., from local storage or cookies).

   ### **Response**
   {
   "message": "Goodbye, John Doe. Token should be removed client-side."
   } 


5. **Protected Route Example**
    - URL: /auth/protected-route
    - Method: POST
    - Description: This is an example of a protected route that requires JWT token authentication. Only users with a valid token can access this route.

   ### **Response**
   {
   "message": "Hello, John Doe. This is a protected route."
   }

   **Possible Error Responses:**
    401 Unauthorized: Invalid or expired token.


6. **Update Superuser Profile**
    - URL: /auth/update-profile/superuser
    - Method: POST
    - Description: Allows a superuser to update their profile information, including name, password, company details, and number of employees.

   ### **Request Body**
   {
   "full_name": "New Name",
   "password": "NewPassword123!",
   "company_name": "New Company Name",
   "company_address": "456 New Address",
   "industry_type": "New Industry",
   "number_of_employees": 100
   }

   ### **Response**
   {
   "message": "Superuser profile updated successfully"
   }

   **Possible Error Responses:**  
   403 Forbidden: Only superusers can update their profiles.
   400 Bad Request: Invalid data input or missing fields.


7. **Update Regular User Profile**
    - URL: /auth/update-profile/user
    - Method: POST
    - Description: Allows a regular user to update their profile, including their name and password.

   ### **Request Body**
   {
   "full_name": "Jane Doe",
   "password": "NewPassword123!"
   }

   ### **Response**
   {
   "message": "User profile updated successfully"
   }

   **Possible Error Responses:**  
   403 Forbidden: Only regular users can update their profiles.
   400 Bad Request: Invalid data input or missing fields.



## **Validation and Security**
  **Email Validation:**
    The email field is validated to ensure it follows the correct format (e.g., user@example.com).

  **Password Hashing:**
    Passwords are hashed using the bcrypt algorithm to ensure security. Raw passwords are not stored in the database.

  **User Roles:**
    Superuser: Can manage regular users and perform administrative tasks.
    Regular User: Has access to the system but cannot create or manage other users.


## **JWT Token Setup**
 - JWT tokens are integrated for secure authentication.
 - Tokens have a configurable expiration time (e.g., 60 minutes).
 - The tokens are validated using middleware on protected routes.


## **Middleware**
   **Authentication Middleware**  
    Middleware is set up to validate JWT tokens on all protected routes.
    Authentication is skipped for /auth/signup and /auth/login since tokens are not available at that stage.

   **Logging Middleware**
     Logs all incoming requests and outgoing responses for tracking and debugging.
     Logs key events like successful login attempts, failed login attempts, superuser actions, and token validation errors.

   **Error Handling Middleware**
     Captures and logs all errors across the application, ensuring consistent error handling.


## **MongoDB Schema**
   **Users COllection**
  {
  "_id": "93734e81-7048-4a55-85ba-202fe222b18a",  // Unique ID for the user
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "password_hash": "$2b$12$eX3y1PwDsi...",
  "role": "superuser",  // or "user"
  "company_id": "93734e81-7048-4a55-85ba-202fe222b18a",  // Superuser ID for all users in the company
  "created_by": "93734e81-7048-4a55-85ba-202fe222b18a",  // Superuser ID for regular users
  "company_name": "Acme Inc",
  "company_address": "123 Main St, San Francisco, CA",
  "industry_type": "Technology",
  "number_of_employees": 50,
  "created_at": "2023-09-07T12:00:00Z",
  "updated_at": "2023-09-07T12:00:00Z",
  "last_login": null
  }
  
## **Testing the API**    
   FastAPI provides auto-generated API documentation that can be accessed at:

 - Swagger UI: http://127.0.0.1:8000/docs
 - ReDoc: http://127.0.0.1:8000/redoc
   You can use these interfaces to explore the API, view request/response formats, and test API calls.

