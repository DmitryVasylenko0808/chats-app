import { SocketContainer } from '@/features/chat/realtime';
import { SideBar } from '@/features/chats/components';
import { MessagesSocketContainer } from '@/features/message/realtime';
import { UnreadNotificationsNotifier } from '@/features/notification/notify-unread-notifications';
import { NotificationsSocketContainer } from '@/features/notification/realtime';

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
