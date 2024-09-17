import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your backend URL

// Sign-Up
const signup = async (userData: { full_name: string; email: string; password: string; company_name: string; company_address: string; industry_type: string; number_of_employees: number }) => {
  try {
    return await axios.post(`${API_URL}/auth/signup`, userData);
  } catch (error: any) {
    return Promise.reject(error.response?.data || 'Sign-up failed');
  }
};

// Login
const login = async (credentials: { email: string; password: string }) => {
  try {
    return await axios.post(`${API_URL}/auth/login`, credentials);
  } catch (error: any) {
    return Promise.reject(error.response?.data || 'Login failed');
  }
};

// Update Superuser Profile
const updateSuperuserProfile = async (token: string, profileData: { full_name?: string; password?: string; company_name?: string; company_address?: string; industry_type?: string; number_of_employees?: number }) => {
  try {
    return await axios.put(`${API_URL}/auth/update-profile/superuser`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    return Promise.reject(error.response?.data || 'Failed to update superuser profile');
  }
};

// Update Regular User Profile
const updateUserProfile = async (token: string, profileData: { full_name?: string; password?: string }) => {
  try {
    return await axios.put(`${API_URL}/auth/update-profile/user`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    return Promise.reject(error.response?.data || 'Failed to update user profile');
  }
};

export { signup, login, updateSuperuserProfile, updateUserProfile };
