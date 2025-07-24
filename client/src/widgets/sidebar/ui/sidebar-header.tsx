import { useGetUnreadCountNotifications } from '@/features/notification/notify-unread-notifications';
import { Button, cn, Logo, Typograpghy, useDrawer } from '@/shared';

import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router';

import { SideBarDrawer } from './sidebar-drawer';

export const SideBarHeader = () => {
  const drawer = useDrawer();
  const { data } = useGetUnreadCountNotifications();

  return (
    <div className="my-6 flex items-center gap-4 px-6">
      <Link to="/" className="flex flex-1 items-center gap-1">
        <Logo />
        <Typograpghy tagVariant="h1">Chats App</Typograpghy>
      </Link>
      <Button
        variant="text"
        onClick={drawer.handleClickOpen}
        className={cn({
          'after:bg-primary-200 relative after:absolute after:top-0 after:right-0 after:h-2 after:w-2 after:rounded-full':
            data?.count,
        })}
      >
        <AiOutlineMenu size={24} />
      </Button>
      <SideBarDrawer
        unreadCountNotifications={data?.count}
        open={drawer.open}
        onClose={drawer.handleClickClose}
      />
    </div>
  );
};
