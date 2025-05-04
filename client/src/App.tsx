import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Route, Routes } from 'react-router';

import { AuthChecker, RequireAuth } from './features/auth/components';
import AuthLayout from './layouts/auth-layout';
import BaseLayout from './layouts/base-layout';
import ChatsPage from './pages/chats-page';
import EditingProfilePage from './pages/editing-profile-page';
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
  return (
    <QueryClientProvider client={queryClient}>
      <AuthChecker>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<ChatsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditingProfilePage />} />
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="sign-in" element={<SignInPage />} />
          </Route>
        </Routes>
      </AuthChecker>
    </QueryClientProvider>
  );
}

export default App;
