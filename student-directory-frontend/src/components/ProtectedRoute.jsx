import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirects unauthenticated users directly to /login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;