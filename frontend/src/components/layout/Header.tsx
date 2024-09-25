// frontend/src/components/layout/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import SuperuserProfileButton from './ProfileButton'; // Import the Superuser profile button from ProfileButton

// Common HeaderProps interface for both headers
interface HeaderProps {
  showLoginButton?: boolean; // Prop for Login button visibility
  showSignUpButton?: boolean; // Prop for SignUp button visibility
}

// Common styles for all headers
const headerStyle = "w-full fixed top-0 bg-white border-b border-gray-200 z-50 flex justify-between items-center h-14"; // Set fixed height (h-16 is 64px)

// Header component for SignUp page
export const HeaderSignUp: React.FC<HeaderProps> = ({ showLoginButton }) => {
  return (
    <header className={headerStyle}>
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
    <header className={headerStyle}>
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
    <header className={headerStyle}>
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
        <div className="flex items-center ml-auto mr-5">
          {/* Add Profiles Button */}
          <button className="text-black font-semibold px-3 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 mr-4">
            ADD PROFILES
          </button>
          {/* Superuser Profile Button */}
          <div className="mt-2">
            <SuperuserProfileButton />
          </div>
        </div>
      </div>
    </header>
  );
};

// Header component for User Dashboard (without login button)
export const HeaderUser: React.FC = () => {
  return (
    <header className={headerStyle}>
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
      </div>
    </header>
  );
};
