// src/utils/api.ts

import axios from 'axios';
import store from '../stores'; // Import Redux store

const API_URL = 'http://localhost:8000'; // Your backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Axios Interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Get the current state from Redux
    const token = state.auth.token; // Get the JWT token from Redux

    console.log("Token being attached to request:", token); // Log the token before attaching to headers

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  
    } else {
      console.warn("No token found in Redux store");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
