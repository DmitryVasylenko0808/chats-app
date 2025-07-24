import { Button, useModal } from '@/shared';

import { DeletingAccountModal } from './deleting-account-modal';

export const DeleteAccountButton = () => {
  const deleteAccModal = useModal();

  return (
    <>
      <Button variant="danger" onClick={deleteAccModal.handleClickOpen} fullWidth>
        Delete Account
      </Button>
      <DeletingAccountModal open={deleteAccModal.open} onClose={deleteAccModal.handleClickClose} />
    </>
  );
};
