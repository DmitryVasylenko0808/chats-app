import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../lib/hooks/use-auth';

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};
