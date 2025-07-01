import { SideBar, SocketContainer } from '@/features/chats/components';
import { UnreadNotificationsNotifier } from '@/features/notifications/components';

import { Outlet } from 'react-router';

const BaseLayout = () => {
  return (
    <SocketContainer>
      <main className="dark:bg-dark-400 relative flex min-h-screen">
        <SideBar />
        <section className="flex-1">
          <Outlet />
        </section>
      </main>
      <UnreadNotificationsNotifier />
    </SocketContainer>
  );
};

export default BaseLayout;
