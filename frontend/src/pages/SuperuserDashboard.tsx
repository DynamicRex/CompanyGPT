// frontend/src/pages/SuperuserDashboard.tsx

import React from 'react';
import { HeaderSuperuser } from '../components/layout/Header'; // Import the Superuser Header

const SuperuserDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderSuperuser /> {/* Add the Superuser Header */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-gray-900">Superuser Dashboard</h1>
      </div>
    </div>
  );
};

export default SuperuserDashboard;
