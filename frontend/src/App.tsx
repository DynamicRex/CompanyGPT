import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import SuperuserDashboard from './pages/SuperuserDashboard'; // Import Superuser Dashboard
import UserDashboard from './pages/UserDashboard'; // Import User Dashboard

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/superuser" element={<SuperuserDashboard />} /> {/* Superuser Dashboard */}
      <Route path="/dashboard/user" element={<UserDashboard />} /> {/* User Dashboard */}
      <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect from / to /signup */}
    </Routes>
  );
}

export default App;
