import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui';

import { DeletingAccountModal } from './deleting-account-modal';

export const UserSettings = () => {
  const deleteAccModal = useModal();

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold">Settings</h2>
      <Button variant="danger" onClick={deleteAccModal.handleClickOpen} fullWidth>
        Delete Account
      </Button>
      <DeletingAccountModal open={deleteAccModal.open} onClose={deleteAccModal.handleClickClose} />
    </div>
  );
};
