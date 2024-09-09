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

// Set up a function to get the CSRF token from the meta tag
const getCsrfToken = (): string | null => {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.getAttribute('content') : null;
};

// Register a new user
export const register = async (userData: UserData): Promise<AuthResponse> => {
    const csrfToken = getCsrfToken();
    const response: AxiosResponse<AuthResponse> = await axios.post(API_URL + 'register', userData, {
        headers: {
            'X-CSRF-TOKEN': csrfToken || '',
        },
    });
    return response.data;
};

// Login and store token in localStorage
export const login = async (credentials: Credentials): Promise<AuthResponse> => {
    const csrfToken = getCsrfToken(); // Fetch CSRF token if required
    const response: AxiosResponse<AuthResponse> = await axios.post(API_URL + 'login', credentials, {
        headers: {
            'X-CSRF-TOKEN': csrfToken || '',
        },
    });
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
