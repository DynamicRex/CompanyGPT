# CompanyGPT Frontend

This is the frontend repository for **CompanyGPT**, built using **React** with **TypeScript**, **Redux**, and **TailwindCSS**. The frontend communicates with the backend via API calls to provide a seamless user experience for superusers and regular users. The application is developed with a focus on scalability, modularity, and a clean user interface.

## Table of Contents
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Component Structure](#component-structure)
- [Atomic Design](#Atomic-Design)
- [State Management](#state-management)
- [Styling](#styling)
- [Authentication](#authentication)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

## Project Structure

The project follows a well-defined folder structure to ensure scalability and maintainability:

## Frontend Structure

├───public                     # Publicly accessible static files.
│   ├───favicon.ico            # Favicon for the website.
│   ├───index.html             # Root HTML file, serves as the entry point for the React app.
│   ├───logo192.png            # App logo for PWA usage.
│   ├───logo512.png            # App logo for PWA usage.
│   ├───manifest.json          # PWA manifest file.
│   └───robots.txt             # Rules for web crawlers and search engines.
├───src                        # Main source code of the frontend app.
│   ├───assets                 # Folder for all static assets (images, svgs, fonts).
│   ├───components             # Reusable UI components.
│   │   ├───common             # Basic UI elements and reusable components (e.g., buttons, input fields).
│   │   └───layout             # Layout components (e.g., header, footer, profile button).
│   ├───hooks                  # Custom React hooks for specific functionality.
│   ├───pages                  # Full pages (e.g., login, dashboard, signup).
│   ├───services               # API service logic, handles communication with the backend.
│   ├───stores                 # Redux store configuration for global state management.
│   ├───styles                 # Global CSS and TailwindCSS configuration.
│   └───utils                  # Helper functions and utility logic.
├───.gitignore                 # Git ignore file, prevents certain files and directories from being pushed to the repository.
├───package-lock.json          # Lock file that tracks exact dependency versions.
├───package.json               # NPM dependencies, scripts, and project metadata.
├───postcss.config.js          # Configuration for PostCSS (used with TailwindCSS).
├───README.md                  # Project documentation.
├───tailwind.config.js         # TailwindCSS configuration file.
└───tsconfig.json              # TypeScript configuration file.

## Tech Stack

- **React**: A library for building user interfaces.
- **TypeScript**: Type-safe JavaScript for better maintainability.
- **Redux Toolkit**: Simplified state management.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Axios**: For handling API requests.
- **Jest** and **React Testing Library**: For testing the frontend components.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `>= v14`
- **npm**: Comes with Node.js or install manually.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/CompanyGPT-frontend.git

2. Navigate into the frontend directory:
   ```bash
   cd CompanyGPT/frontend

3. Install dependencies:
   ```bash
   npm install

### Running the Development Server

To start the development server, run:
   ``bash 
   npm start
   This will launch the application locally on http://localhost:3000.


### Building for Production

To create a production build, run:
   npm run build
   The production build will be output to the build/ directory.

## Component Structure

The components in this project follow a simplified 3-level structure:

- **Common Components**: Basic UI elements (e.g., buttons, inputs, dropdowns) that are reusable across the application.
- **Layout Components**: Larger structural components that organize the layout of pages (e.g., header, footer, profile button).
- **Pages**: Complete pages like Login, Signup, Superuser Dashboard, and User Dashboard. These pages are composed of common and layout components.

This structure is less granular than Atomic Design but maintains a clear separation of concerns and reusability.

### Example:

├───components
│   ├───common
│   │   ├───Button.tsx
│   │   ├───Dropdown.tsx
│   │   ├───InputField.tsx
│   │   └───Logo.tsx
│   └───layout
│       ├───Header.tsx
│       ├───Footer.tsx
│       └───ProfileButton.tsx

## Atomic Design

This project follows the Atomic Design Principle. The UI components are categorized into:

 - Common: Basic UI elements and reusable components (e.g., buttons, input fields). 
 - Layout: Layout components (e.g., header, footer, profile button).
 - Pages: Complete pages (e.g., login, dashboard).


## State Management
Global state is managed using **Redux Toolkit**. The store is set up in the `src/stores/` directory. Each feature of the application has its own slice (e.g., `authSlice.ts` for authentication), and all slices are combined in the `index.ts` file.


## Authentication
- **JWT Token Handling**: The authentication flow is handled using JWT tokens stored in **localStorage** and **Redux**. We use `authSlice.ts` to manage user tokens and roles.
- **Axios Interceptors**: An Axios interceptor is set up in `api.ts` to attach the JWT token to all protected API requests automatically.
- **Logout Functionality**: The logout action clears the token from Redux and localStorage and redirects the user to the login page.

---

## Styling

We use **TailwindCSS** for styling the application. The global CSS file is located in `src/styles/global.css` and contains Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`).

Tailwind is configured in `tailwind.config.js`, and utility classes are used directly within JSX for styling components.


## Testing

We use **Jest** and **React Testing Library** for testing. Test files follow the naming convention `*.test.tsx` and are placed alongside the components they are testing.

1. To run the tests:
   ```bash
   npm run test


## Future Enhancements

- **Role-based access control (RBAC)** for different user roles.
- **Improved Error Handling** for authentication and dashboard features.
- **Responsive Design** for mobile and tablet views.
- **CRUD Operations** for managing user accounts from the superuser dashboard.

### Performance Optimizations:

- Lazy loading of images and components.
- Caching with localStorage or sessionStorage for frequently requested data.

### Progressive Web App (PWA):

- Convert the frontend to a PWA for offline support and mobile app-like experience.

### Security Enhancements:

- Implement CAPTCHA or reCAPTCHA for login/sign-up forms.
- Add rate limiting to sensitive API endpoints.
