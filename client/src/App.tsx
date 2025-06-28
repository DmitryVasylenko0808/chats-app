import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRoutes } from './app-routes';
import { AuthChecker } from './features/auth/components';
import { AlertsContainer, ThemeInitializer } from './shared/components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthChecker>
        <ThemeInitializer>
          <AppRoutes />
        </ThemeInitializer>
      </AuthChecker>
      <AlertsContainer />
    </QueryClientProvider>
  );
}

export default App;
