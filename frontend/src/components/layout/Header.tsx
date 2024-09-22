// frontend/src/components/layout/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

// Common HeaderProps interface for both headers
interface HeaderProps {
  showLoginButton?: boolean; // Prop for Login button visibility
  showSignUpButton?: boolean; // Prop for SignUp button visibility
}

// Header component for SignUp page
export const HeaderSignUp: React.FC<HeaderProps> = ({ showLoginButton }) => {
  return (
    <header className="w-full fixed top-0 bg-white border-b border-gray-200 z-50">
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
        {showLoginButton && (
          <Link to="/login">
            <button className="text-black font-semibold px-7 py-2 rounded-xl bg-gray-200 hover:bg-gray-300">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

// Header component for Login page (with SignUp button)
export const HeaderLogin: React.FC<HeaderProps> = ({ showSignUpButton }) => {
  return (
    <header className="w-full fixed top-0 bg-white border-b border-gray-200 z-50">
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
        {showSignUpButton && (
          <Link to="/signup">
            <button className="text-black font-semibold px-7 py-2 rounded-xl bg-gray-200 hover:bg-gray-300">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

// Header component for Superuser Dashboard (without login button)
export const HeaderSuperuser: React.FC = () => {
  return (
    <header className="w-full fixed top-0 bg-white border-b border-gray-200 z-50">
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
      </div>
    </header>
  );
};

// Header component for User Dashboard (without login button)
export const HeaderUser: React.FC = () => {
  return (
    <header className="w-full fixed top-0 bg-white border-b border-gray-200 z-50">
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
      </div>
    </header>
  );
};
