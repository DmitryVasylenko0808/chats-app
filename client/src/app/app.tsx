import { useTheme } from '@/features/switch-theme';
import { AlertsContainer, useAuth } from '@/shared';

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
