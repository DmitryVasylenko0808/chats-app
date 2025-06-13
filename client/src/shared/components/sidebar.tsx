import { RecentChats, StartMessaging } from '@/features/chats/components';

import { SideBarHeader } from './sidebar-header';

export const SideBar = () => {
  return (
    <aside className="flex">
      <div className="bg-secondary-200 border-r-body/5 w-[380px] border-r-2">
        <SideBarHeader />
        <StartMessaging />
        <RecentChats />
      </div>
    </aside>
  );
};
