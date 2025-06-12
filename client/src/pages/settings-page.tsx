import { DeletingAccountModal } from '@/features/users/components';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui';

const SettingsPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-sm px-6">
        <UserSettings />
      </div>
    </div>
  );
};

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

export default SettingsPage;
