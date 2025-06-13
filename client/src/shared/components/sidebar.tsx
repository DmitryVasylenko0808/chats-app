import { RecentChats, StartMessaging } from '@/features/chats/components';

import { SideBarHeader } from './sidebar-header';

export const SideBar = () => {
  return (
    <aside className="flex">
      <div className="bg-secondary-200 border-r-secondary-300 w-[380px] border-r">
        <SideBarHeader />
        <StartMessaging />
        <RecentChats />
      </div>
    </aside>
  );
};
