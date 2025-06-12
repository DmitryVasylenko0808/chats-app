import { useAuth, useLogOutUser } from '@/features/auth/hooks';

import { AiOutlineHome, AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router';

import { Drawer, DrawerProps } from '../ui';
import { Logo } from './logo';

type SideBarDrawerProps = DrawerProps;

export const SideBarDrawer = (drawerProps: Readonly<SideBarDrawerProps>) => {
  const logOut = useLogOutUser();
  const { currentUser } = useAuth();

  const handleClickLogOut = () => logOut();

  return (
    <Drawer {...drawerProps}>
      <div className="my-6 flex items-center gap-4 px-6">
        <Logo />
        <h1 className="text-2xl font-semibold">Chats App</h1>
      </div>
      <ul className="flex flex-col">
        <li className="inline-flex">
          <Link to="/" className="inline-flex w-full items-center gap-4 px-6 py-2 text-lg">
            <AiOutlineHome size={24} /> Home
          </Link>
        </li>
        <li className="inline-flex">
          <Link
            to={`/profile/${currentUser?.id}`}
            className="inline-flex w-full items-center gap-4 px-6 py-2 text-lg"
          >
            <AiOutlineUser size={24} /> My Profile
          </Link>
        </li>
        <li className="inline-flex">
          <Link to={''} className="inline-flex w-full items-center gap-4 px-6 py-2 text-lg">
            <AiOutlineSetting size={24} /> Settings
          </Link>
        </li>
        <li
          className="inline-flex w-full cursor-pointer items-center gap-4 px-6 py-2 text-lg"
          onClick={handleClickLogOut}
        >
          <AiOutlineLogout size={24} /> Log out
        </li>
      </ul>
    </Drawer>
  );
};
