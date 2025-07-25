import { useAuth, useLogOutUser } from '@/features/auth/hooks';
import { Logo, ThemeSwitcher } from '@/shared/components';
import { Drawer, DrawerProps, Typograpghy } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { AiOutlineBell, AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { Link, useLocation } from 'react-router';

type SideBarDrawerProps = { unreadCountNotifications?: number } & DrawerProps;

export const SideBarDrawer = ({
  unreadCountNotifications,
  ...drawerProps
}: Readonly<SideBarDrawerProps>) => {
  const location = useLocation();
  const logOut = useLogOutUser();
  const { currentUser } = useAuth();

  const handleClickLogOut = () => logOut();

  const menuItems = [
    {
      to: `/profile/${currentUser?.id}`,
      icon: <AiOutlineUser size={24} />,
      label: 'My Profile',
      state: { backgroundLocation: location },
    },
    {
      to: '/notifications',
      icon: <AiOutlineBell size={24} />,
      label: 'Notifications',
      badge: !!unreadCountNotifications && (
        <span className="bg-primary-200 text-secondary-100 inline-flex h-5 items-center justify-center rounded-full px-2 text-xs">
          {unreadCountNotifications}
        </span>
      ),
    },
    {
      to: '/bookmarks',
      icon: <FiBookmark size={24} />,
      label: 'Bookmarks',
    },
    {
      to: '/settings',
      icon: <AiOutlineSetting size={24} />,
      label: 'Settings',
      state: { backgroundLocation: location },
    },
  ];

  return (
    <Drawer {...drawerProps}>
      <div className="my-6 flex items-center gap-4 px-6">
        <Logo />
        <Typograpghy tagVariant="h1">Chats App</Typograpghy>
      </div>
      <ul className="flex flex-col">
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.label}
            to={item.to}
            icon={item.icon}
            label={item.label}
            state={item.state}
            badge={item.badge}
          />
        ))}
        <SidebarMenuDivider />
        <li className="inline-flex w-full items-center gap-4 px-6 py-2 text-lg">
          <ThemeSwitcher />
        </li>
        <SidebarMenuDivider />
        <li
          className="hover:bg-secondary-300 dark:hover:bg-dark-100 dark:text-secondary-100 inline-flex w-full cursor-pointer items-center gap-4 px-6 py-2 text-lg"
          onClick={handleClickLogOut}
        >
          <AiOutlineLogout size={24} /> Log out
        </li>
      </ul>
    </Drawer>
  );
};

type SidebarMenuItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  state?: any;
  badge?: React.ReactNode;
};

const SidebarMenuItem = ({ to, icon, label, state, badge }: Readonly<SidebarMenuItemProps>) => (
  <li className="hover:bg-secondary-300 dark:hover:bg-dark-100 inline-flex">
    <Link
      to={to}
      state={state}
      className={cn(
        'dark:text-secondary-100 inline-flex w-full items-center gap-4 px-6 py-2 text-lg',
        { 'justify-between': badge }
      )}
    >
      <div className="inline-flex items-center gap-4">
        {icon}
        <span>{label}</span>
      </div>
      {badge}
    </Link>
  </li>
);

const SidebarMenuDivider = () => (
  <li className="mx-6 inline-flex">
    <span className="bg-secondary-300 dark:bg-dark-100 block h-[1px] w-full" />
  </li>
);
