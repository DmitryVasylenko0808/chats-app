import { Button, Loader, Modal, ModalProps } from '@/shared/ui';

import { useDeleteUser } from '../hooks';
import { User } from '../types';

type DeletingUserModalProps = ModalProps & {
  user: User;
};

export const DeletingAccountModal = ({ user, ...modalProps }: DeletingUserModalProps) => {
  const { deleteUserAccount, isPending } = useDeleteUser();

  const handleClickDelete = () => {
    deleteUserAccount(user.id)
      .then(() => alert('Account is successfully deleted'))
      .catch((error) => alert(error.message));
  };

  return (
    <Modal {...modalProps}>
      <h2 className="mb-6 text-xl font-semibold">Deleting Account</h2>
      <p className="text-body mb-10">
        Are you sure you want to delete your account? This action cannot be undone. All your data,
        including chats, messages and settings, will be permanently deleted.
      </p>
      <div className="flex justify-end">
        <Button variant="primary" onClick={handleClickDelete}>
          {isPending ? <Loader variant="secondary" size="sm" /> : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};
