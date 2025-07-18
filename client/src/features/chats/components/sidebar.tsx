// Fix: Circular dependency from @/features/chats/*
import { RecentChats, SideBarHeader, StartMessaging } from '@/features/chats/components';

export const SideBar = () => {
  return (
    <aside className="flex">
      <div className="bg-secondary-200 border-r-secondary-300 dark:bg-dark-300 dark:border-r-dark-100 w-[380px] border-r">
        <SideBarHeader />
        <StartMessaging />
        <RecentChats />
      </div>
    </aside>
  );
};
