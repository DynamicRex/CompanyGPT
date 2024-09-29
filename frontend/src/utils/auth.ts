// src/utils/auth.ts

import { login } from '../stores/authSlice';
import store from '../stores';

// Utility function to load JWT token from localStorage and repopulate Redux
export const loadAuthFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId'); // <-- Load userId from localStorage

  if (token && role && userId) {
    store.dispatch(login({ token, role, userId })); // <-- Dispatch userId along with token and role
  }
};
