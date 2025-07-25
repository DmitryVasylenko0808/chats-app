import { webStorage } from '@/config/web-storage';

import { useThemeStore } from '../theme-store';

export const useTheme = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeStore();

  const setCurrentTheme = () => {
    if (webStorage.getItem('darkTheme')) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  };

  const onToggleTheme = (value: boolean) => {
    if (isDarkTheme) {
      webStorage.removeItem('darkTheme');
    } else {
      webStorage.setItem('darkTheme', 'true');
    }

    setIsDarkTheme(value);
    document.documentElement.classList.toggle('dark');
  };

  return { isDarkTheme, setCurrentTheme, onToggleTheme };
};
