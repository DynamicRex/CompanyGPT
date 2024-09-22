// src/utils/auth.ts

import { login } from '../stores/authSlice';
import store from '../stores';

// Utility function to load JWT token from localStorage and repopulate Redux
export const loadAuthFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role) {
    store.dispatch(login({ token, role }));
  }
};
