import { useAuthStore } from '../store';

export const useLogOutUser = () => {
  const { reset: resetAuth } = useAuthStore();

  const logOut = () => {
    localStorage.removeItem('access_token');
    resetAuth();
  };

  return logOut;
};
