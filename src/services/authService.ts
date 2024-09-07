import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Define interfaces for user data and credentials
interface UserData {
    name: string;
    email: string;
    password: string;
}

interface Credentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

// Register a new user
export const register = async (userData: UserData): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await axios.post(API_URL + 'register', userData);
    return response.data;
};

// Login and store token in localStorage
export const login = async (credentials: Credentials): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await axios.post(API_URL + 'login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
};

// Logout by removing the token from localStorage
export const logout = (): void => {
    localStorage.removeItem('token');
};

// Get the Authorization header with the stored token
export const getAuthHeader = (): { Authorization: string } => {
    const token = localStorage.getItem('token');
    return { Authorization: 'Bearer ' + (token || '') };
};
