// src/App.tsx

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SuperuserDashboard from './pages/SuperuserDashboard';
import UserDashboard from './pages/UserDashboard';
import SuperuserSettings from './pages/SuperuserSettings';
import Billing from './pages/Billing';
import ERPConnections from './pages/ERPConnections';
import ManageProfiles from './pages/ManageProfiles';
import UserFAQs from './pages/UserFAQs';
import UserSettings from './pages/UserSettings';
import Unauthorized from './pages/Unauthorized'; // Import Unauthorized page
import ProtectedRoute from './components/common/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes for Superuser */}
      <Route element={<ProtectedRoute requiredRole="superuser" />}>
        <Route path="/dashboard/superuser" element={<SuperuserDashboard />} />
        <Route path="/settings/superuser" element={<SuperuserSettings />} />
        <Route path="/manage-profiles" element={<ManageProfiles />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/erp-connections" element={<ERPConnections />} />
      </Route>

      {/* Protected Routes for Regular User */}
      <Route element={<ProtectedRoute requiredRole="user" />}>
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/settings/user" element={<UserSettings />} />
        <Route path="/faqs" element={<UserFAQs />} />
      </Route>

      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Redirect unknown routes to signup */}
      <Route path="*" element={<Navigate to="/signup" />} />
    </Routes>
  );
}

export default App;
