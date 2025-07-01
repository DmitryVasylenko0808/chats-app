import { webStorage } from '@/config/web-storage';

import { useAuthStore } from '../store';

export const useLogOutUser = () => {
  const { reset: resetAuth } = useAuthStore();

  const logOut = () => {
    webStorage.removeItem('access_token');
    resetAuth();
  };

  return logOut;
};
