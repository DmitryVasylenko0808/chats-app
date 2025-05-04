import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../hooks';

export const RequieAuth = () => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};
