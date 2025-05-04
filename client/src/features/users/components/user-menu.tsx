import { useAuth, useLogOutUser } from '@/features/auth/hooks';
import { useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { ArrowLeftStartOnRectangleIcon, UserIcon } from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router';

export const UserMenu = () => {
  const { currentUser } = useAuth();
  const { open, ref, handleToggle } = useToogleMenu();
  const navigate = useNavigate();
  const logOut = useLogOutUser();

  const handleClickProfile = () => navigate(`/profile`);
  const handleClickLogOut = () => logOut();

  return (
    <Menu
      trigger={
        <div className="cursor-pointer" onClick={handleToggle}>
          <img src={currentUser?.avatar || ''} className="h-9 w-9 rounded-full" alt="user-avatar" />
        </div>
      }
      content={
        <ul>
          <li>
            <Button variant="menu" onClick={handleClickProfile}>
              <UserIcon width={20} height={20} /> Profile
            </Button>
          </li>
          <li>
            <Button variant="menu" onClick={handleClickLogOut}>
              <ArrowLeftStartOnRectangleIcon width={20} height={20} /> Log out
            </Button>
          </li>
        </ul>
      }
      open={open}
      ref={ref}
      contentContainerPosition="top"
    />
  );
};
