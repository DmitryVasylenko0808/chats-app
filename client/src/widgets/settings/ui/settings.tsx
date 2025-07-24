import { useTheme } from '@/features/switch-theme';
import { DeleteAccountButton } from '@/features/user/delete-user-account';
import { Switcher, Typograpghy } from '@/shared';

import { ChangeEvent } from 'react';

export const Settings = () => {
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
