import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Route, Routes } from 'react-router';

import AuthLayout from './layouts/auth-layout';
import RegisterPage from './pages/register';

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
      <Routes>
        <Route path="/" element={<></>}>
          <Route index element={<>HomePage</>} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
