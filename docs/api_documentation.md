# API Documentation

This document provides an overview of the key API endpoints for the backend of CompanyGPT. The endpoints cover user authentication, superuser creation, and the management of regular users within a company.

### Base URL:
http://127.0.0.1:8000

## **Authentication Endpoints**
1. **Superuser Sign-Up Endpoint**
   **URL:** `/auth/signup`  
   **Method:** `POST`  
   **Description:** This endpoint allows the creation of a superuser (the primary user for a company). The superuser can later add regular users to their company.

   ### **Request Body:**
   ```json
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
   **URL:** /auth/add-user
   **Method:** POST
   **Description:** Allows a superuser to add regular users to their company. Each user must have a unique email address

   ```json
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


## **Validation and Security**
  **Email Validation:**
    The email field is validated to ensure it follows the correct format (e.g., user@example.com).

  **Password Hashing:**
    Passwords are hashed using the bcrypt algorithm to ensure security. Raw passwords are not stored in the database.

  **User Roles:**
    Superuser: Can manage regular users and perform administrative tasks.
    Regular User: Has access to the system but cannot create or manage other users.


### **MongoDB Schema**
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
  
  Testing 
  http://127.0.0.1:8000/docs
