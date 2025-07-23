import { DeleteAccountButton } from '@/features/delete-user-account';
import { useTheme } from '@/features/switch-theme';
import { Switcher, Typograpghy } from '@/shared';

import { ChangeEvent } from 'react';

export const UserSettings = () => {
  const { isDarkTheme, onToggleTheme } = useTheme();

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
      <DeleteAccountButton />
    </div>
  );
};
