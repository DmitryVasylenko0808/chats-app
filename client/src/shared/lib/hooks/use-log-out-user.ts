import { webStorage } from '@/shared';

import { useAuthStore } from '../../model/auth-store';

export const useLogOutUser = () => {
  const { reset: resetAuth } = useAuthStore();

  const logOut = () => {
    webStorage.removeItem('access_token');
    resetAuth();
  };

  return logOut;
};
