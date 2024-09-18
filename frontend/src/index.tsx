import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <App /> {/* No need to add Routes here, they are defined inside App */}
    </Router>
  </React.StrictMode>
);

reportWebVitals();
