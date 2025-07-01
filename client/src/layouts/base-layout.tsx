import { SideBar, SocketContainer } from '@/features/chats/components';
import {
  NotificationsSocketContainer,
  UnreadNotificationsNotifier,
} from '@/features/notifications/components';

import { Outlet } from 'react-router';

const BaseLayout = () => {
  return (
    <SocketContainer>
      <NotificationsSocketContainer>
        <main className="dark:bg-dark-400 relative flex min-h-screen">
          <SideBar />
          <section className="flex-1">
            <Outlet />
          </section>
        </main>
      </NotificationsSocketContainer>
      <UnreadNotificationsNotifier />
    </SocketContainer>
  );
};

export default BaseLayout;
