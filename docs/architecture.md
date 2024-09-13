# Architecture Overview

## Architecture Components

### Backend
The backend is built using **FastAPI**, a high-performance web framework that provides a set of RESTful APIs for user management, authentication, and, in the future, AI-powered company insights. It connects to **MongoDB** for persistent data storage and leverages asynchronous programming for efficient handling of I/O operations.

### Technology Stack Overview

**Programming Language:**
- **Python**: The core language used for backend development, offering versatility and a strong ecosystem of libraries.

**Framework:**
- **FastAPI**: Used to build the APIs, including user authentication, routing, and handling asynchronous requests.

**AI Model (Future Integration):**
- **PyTorch**: Will be used for building and serving AI models to provide insights and answers based on company data. This will include integration with query translation and machine learning workflows.

**Database:**
- **MongoDB**: NoSQL database used to store user data, company-related information, JWT tokens, etc.
- **Motor (AsyncIO MongoDB Driver)**: For non-blocking, asynchronous interaction with MongoDB.
- **Redis** (Planned): Will be used for caching frequently accessed data to reduce database load and improve response times.

**Authentication:**
- **JWT (JSON Web Tokens)**: Stateless authentication mechanism used to secure routes and validate user access with tokens.
- **OAuth2PasswordBearer**: Token-based authentication scheme using FastAPI’s Depends mechanism.

**Password Encryption:**
- **bcrypt** (via passlib): Secure password hashing to store and verify user passwords.

**Token Management:**
- **JOSE**: For encoding/decoding JWT tokens using secure algorithms like HMAC SHA-256 to ensure safe token transmission.

**Middleware:**
- **Custom JWT Middleware**: Ensures that all protected endpoints are secured and can only be accessed by authenticated users. This middleware skips authentication checks for `/auth/signup` and `/auth/login` routes.

**Environment Configuration:**
- **dotenv (Environment Variables)**: Used to securely manage sensitive configuration like database URLs, secret keys, and JWT settings in the `.env` file.

**Testing:**
- **Postman**: Utilized for manual API testing to verify the correctness of endpoint responses and error handling.

**Deployment (Potential/Future):**
- **Uvicorn**: ASGI server for serving the FastAPI application in production environments.
- **Docker**: Will be used for containerizing the application, ensuring consistent environments for development, staging, and production.
- **NGINX (Future Plan)**: Web server that will act as a reverse proxy and load balancer to handle traffic, improve performance, and secure communication in production environments.

---

## MongoDB Schema Overview

**MongoDB** is used as the primary database for storing the following collections:

- **Superuser details**: Each superuser is associated with a company and has administrative privileges. The superuser's `_id` serves as both their user ID and company ID.
- **Regular user details**: Employees created by a superuser are linked to the superuser's `company_id`, ensuring that all users are associated with a company.

**Collection Structure:**
- Users are stored in the `users` collection with fields for:
  - `full_name`, `email`, `password_hash`, `role` (superuser or user), `company_id`, `created_by` (for regular users), `created_at`, `updated_at`, and `last_login`.

---

## API Flow

1. **Superuser Creation**:
   - Superusers register via the `/auth/signup` endpoint. Their details, including company-related information, are stored in MongoDB. A JWT token is generated and returned for secure access to future routes.

2. **Regular User Creation by Superuser**:
   - Superusers can create regular users (employees) via the `/auth/add-user` endpoint. Regular users are associated with the superuser’s `company_id` in MongoDB.

3. **Authentication and JWT Validation**:
   - Upon login at `/auth/login`, a JWT token is issued. This token is used for authentication and passed in the Authorization header for all protected routes.
   - Middleware ensures that only authenticated users with valid tokens can access protected endpoints such as `/auth/protected-route`.

4. **Profile Management**:
   - Superusers and regular users can update their profiles via `/auth/update-profile/superuser` and `/auth/update-profile/user` endpoints, respectively.

---

## Middleware and Security

1. **Authentication Middleware**:
   - A custom middleware layer verifies the JWT token for all protected routes. The middleware skips authentication for `/auth/signup` and `/auth/login`, allowing new users to sign up and log in without requiring an existing token.

2. **Logging Middleware**:
   - Logs incoming requests and outgoing responses. It tracks key events like successful and failed login attempts, superuser actions (e.g., creating users), and JWT validation errors (e.g., expired tokens).

3. **Error Handling Middleware**:
   - Catches and handles errors consistently across all routes. Ensures that unexpected errors are logged, and users receive standardized error responses.

---

## Data Flow

1. **Sign-Up and Login**:
   - When a new superuser signs up, their details are stored in MongoDB, and a unique UUID is generated as their user and company ID. Upon login, a JWT token is issued, which the superuser uses for future requests.

2. **User Creation**:
   - Superusers can create regular users under their company. The regular user’s details, including the `company_id`, are stored in MongoDB. These users will be authenticated and authorized with JWT tokens, just like superusers.

3. **Profile Management**:
   - Superusers and regular users can update their profiles, and the updates are reflected in MongoDB. The system uses UUIDs instead of MongoDB’s native ObjectIds for `_id` fields, allowing for more flexibility across services.

---

## Future Expansion

1. **AI Model Integration**:
   - A machine learning model (likely using PyTorch) will be integrated to provide insights based on company data. This AI system will interact with the company’s ERP systems via the `/query` and `/report` endpoints to provide actionable intelligence.

2. **Redis Caching**:
   - **Redis** will be introduced to cache frequently accessed data, such as user profiles, JWT tokens, or query results, reducing the load on MongoDB and improving response times.

3. **Monitoring and Analytics**:
   - Monitoring tools such as **Prometheus** and **Grafana** will be integrated to track API performance, system load, and error rates, providing insights into the system's health.

---

## Deployment Overview (Future)

1. **Docker**:
   - The entire application will be containerized using **Docker**, ensuring that all dependencies and configurations are consistent across development, staging, and production environments.

2. **NGINX**:
   - **NGINX** will be used as a reverse proxy, improving security, performance, and load balancing in production environments. It will handle HTTPS termination, caching, and forwarding of API requests to Uvicorn.

3. **CI/CD Pipeline**:
   - A Continuous Integration and Continuous Deployment (CI/CD) pipeline will be set up to automate the testing, building, and deployment of the application, ensuring a smooth and reliable release process.

