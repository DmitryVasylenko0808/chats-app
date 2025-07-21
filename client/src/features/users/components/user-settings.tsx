import { Button, Switcher, Typograpghy, useModal, useTheme } from '@/shared';

import { ChangeEvent } from 'react';

import { DeletingAccountModal } from './deleting-account-modal';

export const UserSettings = () => {
  const { isDarkTheme, onToggleTheme } = useTheme();
  const deleteAccModal = useModal();

  const handleChangeTheme = (e: ChangeEvent<HTMLInputElement>) => onToggleTheme(e.target.checked);

  return (
    <div>
      <Typograpghy tagVariant="h2" className="mb-6">
        Settings
      </Typograpghy>
      <div className="mb-6 flex justify-between">
        <Typograpghy tagVariant="h3">Dark Theme:</Typograpghy>
        <Switcher onChange={handleChangeTheme} checked={isDarkTheme} />
      </div>
      <Button variant="danger" onClick={deleteAccModal.handleClickOpen} fullWidth>
        Delete Account
      </Button>
      <DeletingAccountModal open={deleteAccModal.open} onClose={deleteAccModal.handleClickClose} />
    </div>
  );
};
