import { create } from 'zustand';

type AuthState = {
  currentUserId: number | null;
  accessToken: string | null;
};

type AuthActions = {
  setAuthCredentials: (currentUserId: number, token: string) => void;
  reset: () => void;
};

const initialState: AuthState = {
  currentUserId: null,
  accessToken: null,
};

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  ...initialState,
  setAuthCredentials: (currentUserId: number, accessToken: string) => {
    set({ currentUserId, accessToken });
  },
  reset: () => {
    set(initialState);
  },
}));
