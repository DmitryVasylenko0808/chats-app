import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Route, Routes } from 'react-router';

import { RequieAuth } from './features/auth/components';
import { useAuth } from './features/auth/hooks';
import AuthLayout from './layouts/auth-layout';
import BaseLayout from './layouts/base-layout';
import ChatsPage from './pages/chats-page';
import ProfilePage from './pages/profile-page';
import RegisterPage from './pages/register-page';
import SignInPage from './pages/sign-in-page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { isAuthenticated, isAccessTokenStored, accessToken, authenticate } = useAuth();

  if (isAuthenticated && !isAccessTokenStored) {
    authenticate(accessToken!);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<RequieAuth />}>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<ChatsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="sign-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
