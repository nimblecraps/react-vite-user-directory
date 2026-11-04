import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // Task 4.1: Render children if authenticated, otherwise redirect to /login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}