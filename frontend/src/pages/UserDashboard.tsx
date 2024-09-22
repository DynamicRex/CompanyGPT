// frontend/src/pages/UserDashboard.tsx

import React from 'react';
import { HeaderUser } from '../components/layout/Header'; // Import the User Header

const UserDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderUser /> {/* Add the User Header */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
      </div>
    </div>
  );
};

export default UserDashboard;
