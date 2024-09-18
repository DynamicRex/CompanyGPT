// frontend/src/components/layout/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

interface HeaderProps {
  showSignInButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSignInButton }) => {
  return (
    <header className="w-full fixed top-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="w-full px-2 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <span className="ml-0 text-lg font-semibold text-gray-900">CompanyGPT</span>
        </div>
        {showSignInButton && (
          <Link to="/login">
            <button className="text-black font-semibold px-7 py-2 rounded-xl bg-gray-200 hover:bg-gray-300">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
