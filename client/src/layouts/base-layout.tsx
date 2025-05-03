import { SideBarMenu } from '@/shared/components';

import { Outlet } from 'react-router';

const BaseLayout = () => {
  return (
    <main className="relative flex min-h-screen">
      <aside className="flex">
        <SideBarMenu />
        <div className="bg-sidebar-sub border-r-body/5 w-[380px] border-r-2">
          <Outlet />
        </div>
      </aside>
      <section className="flex-1">Chats</section>
    </main>
  );
};

export default BaseLayout;
