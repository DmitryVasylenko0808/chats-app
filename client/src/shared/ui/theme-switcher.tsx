import { ChangeEvent } from 'react';
import { AiOutlineMoon, AiOutlineSun } from 'react-icons/ai';

import { useTheme } from '../lib/hooks/use-theme';
import { Switcher } from './switcher';

export const ThemeSwitcher = () => {
  const { isDarkTheme, onToggleTheme } = useTheme();

  const handleChangeTheme = (e: ChangeEvent<HTMLInputElement>) => onToggleTheme(e.target.checked);

  return (
    <div className="dark:text-secondary-100 inline-flex items-center gap-2">
      <AiOutlineSun size={24} />
      <Switcher checked={isDarkTheme} onChange={handleChangeTheme} />
      <AiOutlineMoon size={24} />
    </div>
  );
};
