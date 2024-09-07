import axios from 'axios';

// Define the API URL
const API_URL = 'http://127.0.0.1:8000/api';

// Define the function to get non-admin users
export const getNonAdminUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/non-admins`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch non-admin users', error);
    throw error;
  }
};
