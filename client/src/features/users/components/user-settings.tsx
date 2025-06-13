import { useModal } from '@/shared/hooks';
import { Button, Typograpghy } from '@/shared/ui';

import { DeletingAccountModal } from './deleting-account-modal';

export const UserSettings = () => {
  const deleteAccModal = useModal();

  return (
    <div>
      <Typograpghy tagVariant="h2" className="mb-6">
        Settings
      </Typograpghy>
      <Button variant="danger" onClick={deleteAccModal.handleClickOpen} fullWidth>
        Delete Account
      </Button>
      <DeletingAccountModal open={deleteAccModal.open} onClose={deleteAccModal.handleClickClose} />
    </div>
  );
};
