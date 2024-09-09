// src/hooks/useAuth.ts

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (): boolean => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    return isAuthenticated;
};

export default useAuth;
