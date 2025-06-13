import { SocketContainer } from '@/features/chats/components';
import { SideBar } from '@/shared/components';

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
    </SocketContainer>
  );
};

export default BaseLayout;
