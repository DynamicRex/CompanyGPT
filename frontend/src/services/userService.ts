import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Your backend URL

// Update Profile
const updateUserProfile = async (userData: { name: string; email: string }) => {
  return axios.patch(`${API_URL}/user/profile`, userData);
};

export { updateUserProfile };
