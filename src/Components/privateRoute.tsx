import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Define the props type for the ProtectedRoute component
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token'); // Adjust based on how you store the token

  if (!token) {
    // Redirect to the login page if no token is found
    return <Navigate to="/login" />;
  }

  // If token exists, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
