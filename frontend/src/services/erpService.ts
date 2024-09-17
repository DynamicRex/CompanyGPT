import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Your backend URL

// Example API call to fetch ERP data
const fetchERPData = async () => {
  return axios.get(`${API_URL}/erp/data`);
};

export { fetchERPData };
