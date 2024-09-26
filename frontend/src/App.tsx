// frontend/src/App.tsx

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SuperuserDashboard from './pages/SuperuserDashboard';
import UserDashboard from './pages/UserDashboard';
import SuperuserSettings from './pages/SuperuserSettings'; // Updated import for SuperuserSettings
import Billing from './pages/Billing'; // Import the Billing page
import ERPConnections from './pages/ERPConnections'; // Import ERP Connections page
import ManageProfiles from './pages/ManageProfiles'; // Import Manage Profiles page
import UserFAQs from './pages/UserFAQs'; // Import the User FAQs page
import UserSettings from './pages/UserSettings'; // Import the User Settings page

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/superuser" element={<SuperuserDashboard />} />
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/settings/superuser" element={<SuperuserSettings />} /> {/* Superuser settings route */}
      <Route path="/settings/user" element={<UserSettings />} /> {/* User settings route */}
      <Route path="/faqs" element={<UserFAQs />} /> {/* User FAQs route */}
      <Route path="/billing" element={<Billing />} />
      <Route path="/erp-connections" element={<ERPConnections />} />
      <Route path="/manage-profiles" element={<ManageProfiles />} />
      <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect from / to /signup */}
    </Routes>
  );
}

export default App;
