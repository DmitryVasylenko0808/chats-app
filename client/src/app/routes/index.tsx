import BookmarksPage from '@/pages/bookmarks-page';
import ChatPage from '@/pages/chat-page';
import HomePage from '@/pages/home-page';
import ProfileModal from '@/pages/modals/profile-modal';
import SettingsModal from '@/pages/modals/settings-modal';
import NotificationsPage from '@/pages/notifications-page';
import ProfilePage from '@/pages/profile-page';
import RegisterPage from '@/pages/register-page';
import SettingsPage from '@/pages/settings-page';
import SignInPage from '@/pages/sign-in-page';
import { RequireAuth } from '@/shared/components';

import { Route, Routes, useLocation } from 'react-router';

import AuthLayout from '../layouts/auth-layout';
import BaseLayout from '../layouts/base-layout';

export const AppRoutes = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/chats/:id" element={<ChatPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
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
    </>
  );
};
