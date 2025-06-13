import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { AuthChecker, RequireAuth } from './features/auth/components';
import AuthLayout from './layouts/auth-layout';
import BaseLayout from './layouts/base-layout';
import ChatPage from './pages/chat-page';
import HomePage from './pages/home-page';
import ProfileModal from './pages/modals/profile-modal';
import SettingsModal from './pages/modals/settings-modal';
import ProfilePage from './pages/profile-page';
import RegisterPage from './pages/register-page';
import SettingsPage from './pages/settings-page';
import SignInPage from './pages/sign-in-page';
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
  const location = useLocation();

  useEffect(() => {
    setCurrentTheme();
  }, []);

  const state = location.state as { backgroundLocation?: Location };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthChecker>
        <Routes location={state?.backgroundLocation || location}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/chats/:id" element={<ChatPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="sign-in" element={<SignInPage />} />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/profile/:id" element={<ProfileModal />} />
            <Route path="/settings" element={<SettingsModal />} />
          </Routes>
        )}
      </AuthChecker>
      <AlertsContainer />
    </QueryClientProvider>
  );
}

export default App;
