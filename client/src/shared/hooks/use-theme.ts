import { useThemeStore } from '../theme-store';

export const useTheme = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeStore();

  const setCurrentTheme = () => {
    if (localStorage.getItem('darkTheme')) {
      setIsDarkTheme(true);
      document.documentElement.classList.add('dark');
    }
  };

  const onToggleTheme = (value: boolean) => {
    if (isDarkTheme) {
      localStorage.removeItem('darkTheme');
    } else {
      localStorage.setItem('darkTheme', 'true');
    }

    setIsDarkTheme(value);
    document.documentElement.classList.toggle('dark');
  };

  return { isDarkTheme, setCurrentTheme, onToggleTheme };
};
