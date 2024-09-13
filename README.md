# CompanyGPT

**CompanyGPT** is a platform designed to streamline interactions with Enterprise Resource Planning (ERP) systems using natural language queries. It integrates AI models like LLaMA and connectors such as Zoho to help companies interact with their data more efficiently and intuitively.

## Features
- **User Management**: JWT-based authentication and authorization system for superusers and regular users.
- **AI-Powered Query Translation**: AI models (LLaMA) that enable natural language queries and responses based on company data.
- **ERP Integration**: Pre-built connectors (e.g., Zoho) for seamless data extraction and management.
- **Protected Routes**: Ensures that critical API routes are protected using token-based authentication.
- **Modular Design**: The project is structured to be scalable and easily extensible with different ERPs or AI models.

---

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [API Overview](#api-overview)
4. [Testing](#testing)
5. [Contributing](#contributing)
6. [License](#license)

---

## Installation

To run this project locally, you need to have Python 3.8+ installed along with MongoDB. You can follow these steps:

### Prerequisites

- Python 3.8+
- MongoDB (local or Atlas instance)
- Docker (optional, for containerized setup)

### Step-by-Step Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/CompanyGPT.git
   cd CompanyGPT

2. **Set up a virtual environment:**

   ```bash 
   python -m venv venv
   source venv/bin/activate   # On macOS/Linux
   venv\Scripts\activate      # On Windows

3. **Install Dependencies**

   ```bash 
   pip install -r requirements.txt

4. **Set up environment variables:**
     Create a .env file in the root directory with the following:
    
    ```makefile 
    MONGO_URI=mongodb://localhost:27017/companygpt
    JWT_SECRET=mysecretkey
    ACCESS_TOKEN_EXPIRE_MINUTES=30

5. **Run the server:** 

    ```bash 
    uvicorn main:app --reload

---

## Usage 

Once the server is running, you can use an API client like Postman or cURL to interact with the API.

### Example Requests 

1. **Sign up a superuser:** 

   ```bash 
   POST /auth/signup

   Request Body 
   {
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "company_name": "Example Corp",
  "company_address": "123 Main St, City",
  "industry_type": "Software",
  "number_of_employees": 100
   }

2. **Log In User**

   ```bash 
   POST /auth/login

   Request Body 
   {
  "email": "john@example.com",
  "password": "password123"
   }

   Response 
   {
  "access_token": "your-jwt-token",
  "token_type": "bearer"
   }

3. **Access a protected route:**

   Once logged in, you can access protected routes by including the JWT token in the Authorization header:

   ```bash 
   GET /protected-route

   ```headers 
   Authorization: Bearer your-jwt-token

---


 ## API Overview

  All available API endpoints are documented in the API Documentation file. Here's a brief overview of the main API endpoints:

  - /auth/signup: Sign up a new superuser.
  - /auth/login: Log in a user and retrieve a JWT token.
  - /auth/update-profile/superuser: Update superuser profile information.
  - /auth/update-profile/user: Update regular user profile information.
  - /auth/logout: Log out a user (client-side token removal).
  - /protected-route: Example of a protected route.

  Detailed examples and descriptions are available in the API Documentation.

---

## Testing 

   Unit and integration tests are available for all core modules, including user authentication and AI model integration.

### Running Tests

   To run the tests, make sure you have pytest installed and use the following command:
     ```bash 
    pytest tests/

    This will execute all test cases and generate a report.
   
---


## COntribution 
   We welcome contributions to improve this project! To get started, follow these steps:

 - Fork the repository.
 - Create a new branch: git checkout -b feature/your-feature.
 - Make your changes and commit: git commit -m 'Add new feature'.
 - Push to your branch: git push origin feature/your-feature.
 - Submit a pull request.

### Guidelines
 - Please ensure your code follows the project’s style guide (PEP 8 for Python).
 - Ensure all new code is covered by tests.
 - Submit detailed and clear pull request descriptions.


---


## License
   This project is licensed under the MIT License. See the LICENSE file for more details.

