import { useAuth } from '@/shared';

import { Navigate, Outlet } from 'react-router';

export const AuthGuard = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};
