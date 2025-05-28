import { useModal, useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

import { useNavigate } from 'react-router';

import { User } from '../types';
import { DeletingAccountModal } from './deleting-account-modal';

type UserProfileMenuProps = { user: User };

export const UserProfileMenu = ({ user }: Readonly<UserProfileMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();
  const deleteUserModal = useModal();
  const navigate = useNavigate();

  const handleClickEdit = () => navigate('/profile/edit');
  const handleClickDelete = () => deleteUserModal.handleClickOpen();

  return (
    <div>
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
            <li>
              <Button variant="menu-danger" onClick={handleClickDelete}>
                <TrashIcon width={18} height={18} />
                Delete
              </Button>
            </li>
          </ul>
        }
        open={open}
        ref={ref}
      />
      <DeletingAccountModal
        user={user}
        open={deleteUserModal.open}
        onClose={deleteUserModal.handleClickClose}
      />
    </div>
  );
};
