// frontend/src/components/layout/ProfileButton.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/images/profiles button.png'; // Profile icon path

// Renamed const for the Superuser profile button
const SuperuserProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action here, e.g., using Redux
    // Add your logout logic here (e.g., clearing state or tokens)
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={profileIcon}
          alt="Profile Icon"
          className="w-9 h-9 rounded-full" // Adjusted size and circular shape
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out">
          <ul className="py-2">
            <li>
              <Link
                to="/settings/superuser" // Updated link to Superuser settings page
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-xl transition-all duration-200 ease-in-out"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/billing"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                My Billings
              </Link>
            </li>
            <li>
              <Link
                to="/erp-connections"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                ERP Connections
              </Link>
            </li>
            <li>
              <Link
                to="/manage-profiles"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                Manage Profiles
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-b-xl transition-all duration-200 ease-in-out"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// User profile button
const UserProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action here, e.g., using Redux
    // Add your logout logic here (e.g., clearing state or tokens)
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={profileIcon}
          alt="Profile Icon"
          className="w-9 h-9 rounded-full" // Adjusted size and circular shape
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out">
          <ul className="py-2">
            <li>
              <Link
                to="/faqs" // Link to User FAQs page
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-t-xl transition-all duration-200 ease-in-out"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/settings/user" // Link to User settings page
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-b-xl transition-all duration-200 ease-in-out"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export { SuperuserProfileButton, UserProfileButton };