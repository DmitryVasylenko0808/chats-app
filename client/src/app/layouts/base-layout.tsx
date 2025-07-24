import { SideBar, SocketContainer } from '@/features/chats/components';
import { MessagesSocketContainer } from '@/features/messages/components';
import { UnreadNotificationsNotifier } from '@/features/notification/notify-unread-notifications';
import { NotificationsSocketContainer } from '@/features/notifications/components';

import { Outlet } from 'react-router';

const BaseLayout = () => {
  return (
    <SocketContainer>
      <MessagesSocketContainer>
        <NotificationsSocketContainer>
          <main className="dark:bg-dark-400 relative flex min-h-screen">
            <SideBar />
            <section className="flex-1">
              <Outlet />
            </section>
          </main>
        </NotificationsSocketContainer>
      </MessagesSocketContainer>
      <UnreadNotificationsNotifier />
    </SocketContainer>
  );
};

export default BaseLayout;
