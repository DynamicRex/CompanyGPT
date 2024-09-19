import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Your backend URL

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Axios Interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Fix the token attachment
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
