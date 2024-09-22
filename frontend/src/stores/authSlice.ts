// src/stores/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of our auth state
interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log the user in
    login: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      // Store the token and role in localStorage for persistence
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role); // Add role to localStorage
    },
    // Action to log the user out
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      // Remove token and role from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});

// Export actions (login and logout)
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
