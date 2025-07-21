import { create } from 'zustand';

type ThemeState = { isDarkTheme: boolean };
type ThemeAction = {
  setIsDarkTheme: (value: boolean) => void;
};
type ThemeStore = ThemeState & ThemeAction;

const initialState: ThemeState = { isDarkTheme: false };

export const useThemeStore = create<ThemeStore>()((set) => ({
  ...initialState,
  setIsDarkTheme: (value: boolean) => {
    set((prev) => ({ ...prev, isDarkTheme: value }));
  },
}));
