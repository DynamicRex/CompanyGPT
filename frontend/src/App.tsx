import React from 'react';
import SignUp from './pages/SignUp'; // Import the SignUp component
import './styles/global.css'; // Ensure the global styles are still applied

function App() {
  return (
    <div className="App">
      <SignUp /> {/* Render the SignUp page */}
    </div>
  );
}

export default App;
