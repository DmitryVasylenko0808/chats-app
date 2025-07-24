import { Button, Loader, Modal, ModalProps, Typograpghy, useAlerts, useAuth } from '@/shared';

import { useDeleteUser } from '../lib/hooks/use-delete-user';

type DeletingUserModalProps = ModalProps;

export const DeletingAccountModal = (modalProps: DeletingUserModalProps) => {
  const { currentUser } = useAuth();
  const { mutateAsync, isPending } = useDeleteUser();
  const { notify } = useAlerts();

  const handleClickDelete = () => {
    mutateAsync(currentUser?.id)
      .then(() =>
        notify({ variant: 'success', title: 'Success', text: 'Account is successfully deleted' })
      )
      .catch((error) => notify({ variant: 'error', title: 'Error', text: error.message }));
  };

  return (
    <Modal className="w-xl" {...modalProps}>
      <Typograpghy tagVariant="h2" className="mb-6">
        Deleting Account
      </Typograpghy>
      <Typograpghy className="mb-10">
        Are you sure you want to delete your account? This action cannot be undone. All your data,
        including chats, messages and settings, will be permanently deleted.
      </Typograpghy>
      <div className="flex justify-end">
        <Button variant="danger" onClick={handleClickDelete}>
          {isPending ? <Loader variant="secondary" size="sm" /> : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};
