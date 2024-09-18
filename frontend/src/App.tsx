import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn'; // Assuming you'll create a SignIn component

function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <Routes>
        <Route path="/signup" element={<SignUp />} /> {/* Define the SignUp route */}
        <Route path="/signin" element={<SignIn />} /> {/* Define the SignIn route */}
      </Routes>
    </Router>
  );
}

export default App;
