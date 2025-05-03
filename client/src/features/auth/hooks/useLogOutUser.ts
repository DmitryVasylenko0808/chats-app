import { useAuthStore } from '../store';

export const useLogOutUser = () => {
  const { reset } = useAuthStore();

  const logOut = () => {
    localStorage.removeItem('access_token');
    reset();
  };

  return logOut;
};
