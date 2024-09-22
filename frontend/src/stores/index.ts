// src/stores/index.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import the auth slice

// Set up the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Add auth slice to the store
  },
});

// Export store and RootState for global usage
export type RootState = ReturnType<typeof store.getState>;
export default store;
