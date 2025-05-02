import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../hooks';

const RequieAuth = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default RequieAuth;
