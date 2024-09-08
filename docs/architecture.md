# Architecture Overview

## Architecture Components

### Backend
The backend is built using FastAPI, providing a set of RESTful APIs for user management, authentication, and eventually AI-based company insights. It connects to MongoDB for persistent data storage.

### MongoDB
MongoDB is used as the primary database for storing:
- Superuser details: Each superuser is associated with a company and has administrative privileges.
- Regular user details: Employees created by a superuser are linked to the superuser's `company_id`.
  
### API Flow

1. **Superuser Creation**:
   - Superusers register via the `/auth/signup` endpoint, and their information is stored in the MongoDB `users` collection.
   - The superuser's `_id` serves as both their user ID and company ID.
  
2. **User Creation by Superuser**:
   - Superusers can create regular users (employees) via the `/auth/add-user` endpoint. Each user is linked to the superuser's `company_id` in the database.
  
---

### Future Expansion

- **Authentication Middleware**: JWT-based authentication will be added to secure API endpoints.
- **AI Integration**: A machine learning model will be added to process and analyze company data in real-time.

---

### Data Flow

