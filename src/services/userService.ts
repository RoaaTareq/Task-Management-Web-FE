import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getNonAdminUsers = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await axios.get(`${API_URL}/users/non-admins`, {
      params: {
        page,
        per_page: perPage,
      },
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
