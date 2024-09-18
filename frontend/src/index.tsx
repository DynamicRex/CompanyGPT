import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Add react-router
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Add other routes here, for example: */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
