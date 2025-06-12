import { AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router';

import { useDrawer } from '../hooks';
import { Button } from '../ui';
import { Logo } from './logo';
import { SideBarDrawer } from './sidebar-drawer';

export const SideBarHeader = () => {
  const drawer = useDrawer();

  return (
    <div className="my-6 flex items-center gap-4 px-6">
      <Link to="/" className="flex flex-1 items-center gap-1">
        <Logo />
        <h1 className="text-2xl font-semibold">Chats App</h1>
      </Link>
      <Button variant="text" onClick={drawer.handleClickOpen}>
        <AiOutlineMenu size={24} />
      </Button>
      <SideBarDrawer open={drawer.open} onClose={drawer.handleClickClose} />
    </div>
  );
};
