import { Logo } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Button, Typograpghy } from '@/shared/ui';

import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router';

import { SideBarDrawer } from './sidebar-drawer';

export const SideBarHeader = () => {
  const drawer = useDrawer();

  return (
    <div className="my-6 flex items-center gap-4 px-6">
      <Link to="/" className="flex flex-1 items-center gap-1">
        <Logo />
        <Typograpghy tagVariant="h1">Chats App</Typograpghy>
      </Link>
      <Button variant="text" onClick={drawer.handleClickOpen}>
        <AiOutlineMenu size={24} />
      </Button>
      <SideBarDrawer open={drawer.open} onClose={drawer.handleClickClose} />
    </div>
  );
};
