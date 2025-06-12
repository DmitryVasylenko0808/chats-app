import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Route, Routes } from 'react-router';

import { AuthChecker, RequireAuth } from './features/auth/components';
import AuthLayout from './layouts/auth-layout';
import BaseLayout from './layouts/base-layout';
import ChatPage from './pages/chat-page';
import EditingProfilePage from './pages/editing-profile-page';
import HomePage from './pages/home-page';
import ProfilePage from './pages/profile-page';
import RegisterPage from './pages/register-page';
import SettingsPage from './pages/settings-page';
import SignInPage from './pages/sign-in-page';
import { AlertsContainer } from './shared/components';

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
              <Route index element={<HomePage />} />
              <Route path="/chats/:id" element={<ChatPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditingProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="sign-in" element={<SignInPage />} />
          </Route>
        </Routes>
      </AuthChecker>
      <AlertsContainer />
    </QueryClientProvider>
  );
}

export default App;
