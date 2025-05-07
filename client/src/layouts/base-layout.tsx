import { Chat } from '@/features/chats/components';
import { useCurrentChatStore } from '@/features/chats/store';
import { SideBarMenu } from '@/shared/components';

import { Outlet } from 'react-router';

const BaseLayout = () => {
  const { chatId } = useCurrentChatStore();

  return (
    <main className="relative flex min-h-screen">
      <aside className="flex">
        <SideBarMenu />
        <div className="bg-sidebar-sub border-r-body/5 w-[380px] border-r-2">
          <Outlet />
        </div>
      </aside>
      <section className="flex-1">
        {chatId ? <Chat chatId={chatId} /> : <div>No Chat Selected</div>}
      </section>
    </main>
  );
};

export default BaseLayout;
