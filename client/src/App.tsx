import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect } from 'react';

import { AppRoutes } from './app-routes';
import { AuthChecker } from './features/auth/components';
import { AlertsContainer } from './shared/components';
import { useTheme } from './shared/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { setCurrentTheme } = useTheme();

  useEffect(() => {
    setCurrentTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthChecker>
        <AppRoutes />
      </AuthChecker>
      <AlertsContainer />
    </QueryClientProvider>
  );
}

export default App;
