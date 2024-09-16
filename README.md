# CompanyGPT

CompanyGPT is an AI-driven platform designed to help companies interact with their ERP systems via natural language queries. This project is divided into two main parts: the backend (handling API, database, and ERP system connections) and the frontend (user interface for company superusers and regular users). The platform is designed for scalability and modularity, with a focus on clean UI/UX and efficient integration of AI for ERP insights.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Servers](#running-the-development-servers)
  - [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
CompanyGPT provides companies with an AI assistant capable of querying their ERP system data through natural language. The platform integrates with external ERP systems and allows companies to interact with their data more intuitively. Features include role-based dashboards, user management, and API-based ERP integration.

## Architecture
The CompanyGPT platform is built using a **microservices architecture**, where the backend and frontend communicate via RESTful APIs. The backend handles the heavy lifting, such as ERP integration, authentication, and AI-based data processing, while the frontend provides an intuitive user interface for interaction with the system.

### Key Components:
- **Backend**: Built with FastAPI, MongoDB, and Python for connecting to ERP systems, handling AI models, and user management.
- **Frontend**: Developed using React, TypeScript, Redux, and TailwindCSS for creating a scalable and maintainable UI.

## Tech Stack

### Backend:
- **FastAPI**: High-performance web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and ERP data.
- **PyTorch**: AI/ML library for handling model-related tasks.
- **Docker**: For containerization and deployment.

### Frontend:
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Ensures type safety in JavaScript code.
- **Redux**: For state management across the application.
- **TailwindCSS**: Utility-first CSS framework for styling.

### Testing and CI/CD:
- **Jest**: Testing framework for frontend components.
- **GitHub Actions**: For continuous integration and deployment.

## Project Structure
CompanyGPT/
├── .github/
│   └── workflows/
│       └── ci-cd-pipeline.yml
├── backend/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── endpoints.py
│   │   │   └── __init__.py
│   │   ├── connectors/
│   │   │   ├── zoho_connector.py
│   │   │   └── __init__.py
│   │   ├── erp/
│   │   │   ├── endpoints.py
│   │   │   └── __init__.py
│   │   ├── query/
│   │   │   ├── endpoints.py
│   │   │   ├── query_translation.py
│   │   │   └── __init__.py
│   │   ├── report/
│   │   │   ├── endpoints.py
│   │   │   └── __init__.py
│   │   ├── support/
│   │   │   ├── endpoints.py
│   │   │   └── __init__.py
│   │   ├── middleware.py
│   │   └── __init__.py
│   ├── logs/
│   │   └── app.log
│   ├── models/
│   │   ├── llama_model.py
│   │   └── __init__.py
│   ├── tests/
│   │   ├── test_connectors.py
│   │   ├── test_models.py
│   │   └── __init__.py
│   ├── utils/
│   │   ├── config.py
│   │   ├── logging.py
│   │   ├── security.py
│   │   └── __init__.py
│   ├── Dockerfile
│   ├── main.py
│   ├── README.md
│   └── requirements.txt
├── docs/
│   ├── api_documentation.md
│   ├── architecture.md
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   ├── logo.svg
│   │   │   ├── svgs/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   ├── pages/
│   │   │   ├── templates/
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── erpService.ts
│   │   │   └── userService.ts
│   │   ├── stores/
│   │   │   ├── authSlice.ts
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── utils/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── constants.ts
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── tsconfig.json
├── infrastructure/
│   ├── ansible/
│   ├── cloudformation/
│   └── terraform/
├── mobile/
│   ├── android/
│   ├── ios/
│   └── src/
└── scripts/
    ├── deployment/
    └── setup/


## Backend
The backend is responsible for:

- Handling authentication and authorization (JWT-based).
- Connecting to ERP systems via APIs.
- Performing AI-based query translation and responding to user queries.
- Managing superuser and regular user roles, profiles, and permissions.

For more details, refer to the [Backend README](./backend/README.md).

## Frontend
The frontend provides the user interface for superusers and regular users to interact with the system. It includes:

- A dashboard for users to view their ERP data and insights.
- Role-based access for superusers and regular users.
- User profile management.

For more details, refer to the [Frontend README](./frontend/README.md).

## Getting Started

### Prerequisites
Before running the project, ensure you have the following installed:

- **Node.js** (>= v14)
- **Python** (>= 3.8)
- **MongoDB** (for backend database)
- **Docker** (optional, for containerization)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repository/CompanyGPT.git

2. Install backend dependencies: Navigate to the backend directory and install the required dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt

3. Install frontend dependencies: Navigate to the frontend directory and install the required dependencies:
   ```bash
   cd ../frontend

   npm install

### Running the Development Servers

1. Backend: To start the FastAPI backend server, navigate to the backend directory and run:
   uvicorn main:app --reload

The backend will be available at http://localhost:8000

2. Frontend: To start the React frontend development server, navigate to the frontend directory and run:
   npm start

The frontend will be available at http://localhost:3000

### Building for Production

1. Backend: Build and run the FastAPI backend using Docker for production:
   ```bash
   docker build -t companygpt-backend .
   docker run -d -p 8000:8000 companygpt-backend

2. Frontend: Create a production build for the frontend:
   ```bash
   npm run build

 The production files will be available in the build/ directory.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any features, improvements, or bug fixes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.