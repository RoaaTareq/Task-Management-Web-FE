// src/services/authService.ts

import axios from '../utils/axios';

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

export const register = async (userData: RegisterData): Promise<void> => {
    try {
        await axios.post('/register', userData);
    } catch (error: any) {
        throw error.response.data;
    }
};

export const login = async (credentials: LoginData): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>('/login', credentials);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
