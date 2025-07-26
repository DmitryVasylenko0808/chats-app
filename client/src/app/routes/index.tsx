import BookmarksPage from '@/pages/bookmarks';
import ChatPage from '@/pages/chat';
import HomePage from '@/pages/home';
import NotificationsPage from '@/pages/notifications';
import RegisterPage from '@/pages/register';
import SettingsPage from '@/pages/settings';
import SettingsModal from '@/pages/settings-modal';
import SignInPage from '@/pages/sign-in';
import ProfilePage from '@/pages/user-profile';
import UserProfileModalPage from '@/pages/user-profile-modal';

import { Route, Routes, useLocation } from 'react-router';

import AuthLayout from '../layouts/auth-layout';
import BaseLayout from '../layouts/base-layout';
import { AuthGuard } from './auth-guard';
import { GuestGuard } from './guest-guard';

export const AppRoutes = () => {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/chats/:id" element={<ChatPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>
        <Route element={<GuestGuard />}>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="sign-in" element={<SignInPage />} />
          </Route>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/profile/:id" element={<UserProfileModalPage />} />
          <Route path="/settings" element={<SettingsModal />} />
        </Routes>
      )}
    </>
  );
};
