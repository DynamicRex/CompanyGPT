// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Redux provider and store
import { Provider } from 'react-redux';
import store from './stores';

// Import the utility to load auth from localStorage
import { loadAuthFromLocalStorage } from './utils/auth';

// Load authentication state from localStorage (repopulating Redux)
loadAuthFromLocalStorage(); // This ensures Redux state is populated with token if available

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the app in the Redux provider */}
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
