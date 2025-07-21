import { useAuth } from '@/features/auth/hooks';
import { AlertsContainer } from '@/shared/components';
import { useTheme } from '@/shared/hooks';

import { useEffect } from 'react';

import { AppRoutes } from './routes';

function App() {
  const { isAccessTokenStored, accessToken, authenticate } = useAuth();
  const { setCurrentTheme } = useTheme();

  if (accessToken && !isAccessTokenStored) {
    authenticate(accessToken);
  }

  useEffect(() => {
    setCurrentTheme();
  }, []);

  return (
    <>
      <AppRoutes />
      <AlertsContainer />
    </>
  );
}

export default App;
