import { PropsWithChildren, useEffect } from 'react';

import { useTheme } from '../hooks';

type ThemeInitializerProps = PropsWithChildren;

export const ThemeInitializer = ({ children }: Readonly<ThemeInitializerProps>) => {
  const { setCurrentTheme } = useTheme();

  useEffect(() => {
    setCurrentTheme();
  }, []);

  return children;
};
