import { UserMenu } from '@/features/users/components';
import { ChatBubbleOvalLeftIcon, UserIcon } from '@heroicons/react/16/solid';

import { NavLink } from 'react-router';

import { Logo } from './logo';

type NavItem = { href: string; icon: React.ReactNode };

const navItems: NavItem[] = [
  { href: '/profile', icon: <UserIcon width={24} height={24} /> },
  { href: '/', icon: <ChatBubbleOvalLeftIcon width={24} height={24} /> },
];

export const SideBarMenu = () => {
  return (
    <div className="border-r-body/15 flex h-full w-[75px] flex-col border-r shadow-lg">
      <div className="flex justify-center py-3">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-center py-3">
        <ul className="flex flex-col space-y-2.5">
          {navItems.map((item) => (
            <li>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary bg-sidebar-menu-item-active inline-flex h-14 w-14 items-center justify-center rounded-xl'
                    : 'text-body inline-flex h-14 w-14 items-center justify-center rounded-xl'
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center py-3">
        <UserMenu />
      </div>
    </div>
  );
};
