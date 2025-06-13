import { useAuth, useLogOutUser } from '@/features/auth/hooks';

import { AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { Link, useLocation } from 'react-router';

import { Drawer, DrawerProps, Typograpghy } from '../ui';
import { Logo } from './logo';

type SideBarDrawerProps = DrawerProps;

export const SideBarDrawer = (drawerProps: Readonly<SideBarDrawerProps>) => {
  const location = useLocation();
  const logOut = useLogOutUser();
  const { currentUser } = useAuth();

  const handleClickLogOut = () => logOut();

  return (
    <Drawer {...drawerProps}>
      <div className="my-6 flex items-center gap-4 px-6">
        <Logo />
        <Typograpghy tagVariant="h1">Chats App</Typograpghy>
      </div>
      <ul className="flex flex-col">
        <li className="hover:bg-secondary-300 inline-flex">
          <Link
            to={`/profile/${currentUser?.id}`}
            state={{ backgroundLocation: location }}
            className="inline-flex w-full items-center gap-4 px-6 py-2 text-lg"
          >
            <AiOutlineUser size={24} /> My Profile
          </Link>
        </li>
        <li className="hover:bg-secondary-300 inline-flex">
          <Link
            to="/settings"
            state={{ backgroundLocation: location }}
            className="inline-flex w-full items-center gap-4 px-6 py-2 text-lg"
          >
            <AiOutlineSetting size={24} /> Settings
          </Link>
        </li>
        <li className="mx-6 inline-flex">
          <span className="bg-secondary-300 block h-[1px] w-full" />
        </li>
        <li
          className="hover:bg-secondary-300 inline-flex w-full cursor-pointer items-center gap-4 px-6 py-2 text-lg"
          onClick={handleClickLogOut}
        >
          <AiOutlineLogout size={24} /> Log out
        </li>
      </ul>
    </Drawer>
  );
};
