// src/stores/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of our auth state
interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  userId: string | null; // <-- Add userId to store superuser ID
}

const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
  userId: null,  // <-- Initialize userId
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log the user in
    login: (state, action: PayloadAction<{ token: string; role: string; userId: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId; // <-- Store userId in state
      state.isAuthenticated = true;
      // Store the token, role, and userId in localStorage for persistence
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('userId', action.payload.userId); // <-- Store userId in localStorage
    },
    // Action to log the user out
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.userId = null; // <-- Clear userId on logout
      state.isAuthenticated = false;
      // Remove token, role, and userId from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId'); // <-- Remove userId from localStorage
    },
  },
});

// Export actions (login and logout)
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
