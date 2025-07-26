import { useAuth } from '@/shared';

import { Navigate, Outlet } from 'react-router';

export const GuestGuard = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};
