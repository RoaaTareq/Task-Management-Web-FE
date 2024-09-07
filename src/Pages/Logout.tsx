import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext'; // Use the AuthContext

const Logout: React.FC = () => {
  const { logout } = useContext(AuthContext); // Get logout from context
  const navigate = useNavigate();

  useEffect(() => {
    logout();  // Clear the token and update state
    navigate('/login');  // Redirect to login page
  }, [logout, navigate]);

  return null;  // No UI is needed
};

export default Logout;
