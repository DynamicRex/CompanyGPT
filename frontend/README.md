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
- [Atomic Design](#atomic-design)
- [State Management](#state-management)
- [Styling](#styling)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)

## Project Structure

The project follows a well-defined folder structure to ensure scalability and maintainability:

## Frontend Structure

D:.
│   .gitignore                 # Git ignore file, prevents certain files and directories from being pushed to the repository.
│   package-lock.json          # Lock file that tracks exact dependency versions.
│   package.json               # NPM dependencies, scripts, and project metadata.
│   postcss.config.js          # Configuration for PostCSS (used with TailwindCSS).
│   README.md                  # Project documentation.
│   tailwind.config.js         # TailwindCSS configuration file.
│   tsconfig.json              # TypeScript configuration file.
│
├───public                     # Publicly accessible static files.
│   │   favicon.ico            # Favicon for the website.
│   │   index.html             # Root HTML file, serves as the entry point for the React app.
│   │   logo192.png            # App logo (192x192) for PWA (Progressive Web App) usage.
│   │   logo512.png            # App logo (512x512) for PWA (Progressive Web App) usage.
│   │   manifest.json          # PWA manifest file (optional).
│   │   robots.txt             # Rules for web crawlers and search engines.
│
├───src                        # Main source code of the frontend app.
│   │   App.test.tsx           # Example test file for testing the App component.
│   │   App.tsx                # Main React component entry point.
│   │   index.tsx              # ReactDOM render entry point.
│   │   react-app-env.d.ts     # Auto-generated environment typing for the project.
│   │   reportWebVitals.ts     # Optional performance monitoring.
│   │   setupTests.ts          # Jest setup for unit tests.
│
│   ├───assets                 # Folder for all static assets (images, svgs, fonts).
│   │   ├───images             # Images used in the app.
│   │   │   ├── logo.svg       # Example logo image in SVG format.
│   │   └───svgs               # Any additional SVG files (if required).
│
│   ├───components             # Atomic design components.
│   │   ├───atoms              # Basic UI elements (e.g., buttons, inputs).
│   │   ├───molecules          # Combinations of atoms (e.g., form fields, navbars).
│   │   ├───organisms          # Larger building blocks (e.g., header, footer).
│   │   ├───templates          # Page layouts that wrap organisms and other components.
│   │   └───pages              # Full pages (e.g., login, dashboard, signup).
│
│   ├───hooks                  # Custom React hooks for specific functionality.
│   │   └── useAuth.ts         # Example hook for handling authentication.
│
│   ├───services               # API service logic, handles communication with the backend.
│   │   ├── authService.ts     # Handles authentication-related API calls.
│   │   ├── erpService.ts      # Handles ERP system-related API calls.
│   │   └── userService.ts     # Handles user profile management API calls.
│
│   ├───stores                 # Redux Toolkit store configuration for global state management.
│   │   ├── authSlice.ts       # Manages authentication-related global state.
│   │   └── index.ts           # Root store configuration.
│
│   ├───styles                 # Global CSS and TailwindCSS configuration.
│   │   └── global.css         # Global styles using TailwindCSS directives.
│
│   └───utils                  # Helper functions and utility logic.
│       ├── api.ts             # General API calls logic.
│       ├── auth.ts            # Utility functions related to authentication.
│       └── constants.ts       # Stores constants such as API URLs, keys, etc.


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
   npm start
   This will launch the application locally on http://localhost:3000.


### Building for Production

To create a production build, run:
   npm run build
   The production build will be output to the build/ directory.


## Atomic Design

This project follows the Atomic Design Principle. The UI components are categorized into:

 - Atoms: Basic building blocks (e.g., buttons, inputs).
 - Molecules: Combinations of atoms (e.g., form fields, navbars).
 - Organisms: Larger components (e.g., headers, footers).
 - Templates: Page layouts.
 - Pages: Complete pages (e.g., login, dashboard).


## State Management

Global state is managed using Redux Toolkit. The store is set up in the src/stores/ directory. Each feature of the application has its own slice (e.g., authSlice.ts for authentication), and all slices are combined in the index.ts file.


## Styling
We use TailwindCSS for styling the application. The global CSS file is located in src/styles/global.css and contains Tailwind directives (@tailwind base; @tailwind components; @tailwind utilities;).

Tailwind is configured in tailwind.config.js, and utility classes are used directly within JSX for styling components.


## Testing
We use Jest and React Testing Library for testing. Test files follow the naming convention *.test.tsx and are placed alongside the components they are testing.

To run the tests:
   npm run test


## Future Enhancements
 - Implement role-based access control (RBAC) for different user roles.
 - Integrate responsive design for mobile and tablet views.
 - Improve performance monitoring with custom metrics.