import { User } from '@/entities/user';
import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  currentUser: User | null;
};

type UpdateUserData = Partial<Omit<User, 'id'>>;

type AuthActions = {
  setAuthCredentials: (accessToken: string, user: User) => void;
  updateCurrentUserData: (updatedUserData: UpdateUserData) => void;
  reset: () => void;
};

const initialState: AuthState = {
  accessToken: null,
  currentUser: null,
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set, get) => ({
  ...initialState,
  setAuthCredentials: (accessToken: string, user: User) => {
    set({ accessToken, currentUser: user });
  },
  updateCurrentUserData: (updatedUserData: UpdateUserData) => {
    const currentUser = get().currentUser;

    if (!currentUser) return;

    set({ accessToken: get().accessToken, currentUser: { ...currentUser, ...updatedUserData } });
  },
  reset: () => {
    set(initialState);
  },
}));
