// src/services/userService.ts

import api from '../utils/api'; // Import the api instance from utils/api.ts

const addUser = async (superuserId: string, userData: { full_name: string; email: string; password: string }) => {
  try {
    const response = await api.post('/auth/add-user', {
      superuser_id: superuserId, 
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password,
    });
    return response.data; // Return the response from the backend
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail); // Handle specific error messages from the backend
    }
    throw new Error('Failed to add user.'); // General error message
  }
};

export { addUser };
