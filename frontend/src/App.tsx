import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login'; // Updated the component import

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} /> {/* Changed the path from /signin to /login */}
      <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect from / to /signup */}
    </Routes>
  );
}

export default App;
