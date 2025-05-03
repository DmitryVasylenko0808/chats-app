import { useToogleMenu } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { Menu } from '@/shared/ui/menu';
import { EllipsisVerticalIcon, PencilIcon } from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router';

export const UserProfileMenu = () => {
  const { open, ref, handleToggle } = useToogleMenu();
  const navigate = useNavigate();

  const handleClickEdit = () => navigate('/profile/edit');

  return (
    <Menu
      trigger={
        <Button aria-label="menu" variant="text" onClick={handleToggle}>
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      }
      content={
        <ul>
          <li>
            <Button variant="menu" onClick={handleClickEdit}>
              <PencilIcon width={18} height={18} />
              Edit
            </Button>
          </li>
        </ul>
      }
      open={open}
      ref={ref}
    />
  );
};
