import { NewChat } from './new-chat';
import { RecentChats } from './recent-chats';
import { SideBarHeader } from './sidebar-header';

export const SideBar = () => {
  return (
    <aside className="flex">
      <div className="bg-secondary-200 border-r-secondary-300 dark:bg-dark-300 dark:border-r-dark-100 w-[380px] border-r">
        <SideBarHeader />
        <NewChat />
        <RecentChats />
      </div>
    </aside>
  );
};
