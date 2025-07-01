import { webStorage } from '@/config/web-storage';
import { useQuery } from '@tanstack/react-query';

import { getMe } from '../api';
import { useAuthStore } from '../store';

export const useAuth = () => {
  const {
    currentUser,
    accessToken: storedAccessToken,
    setAuthCredentials,
    reset,
    updateCurrentUserData,
  } = useAuthStore();
  const { refetch } = useQuery({
    queryKey: ['curr'],
    queryFn: getMe,
    enabled: false,
    retry: false,
  });

  const accessToken = webStorage.getItem('access_token');
  const isAuthenticated = !!accessToken;
  const isAccessTokenStored = !!storedAccessToken;

  const authenticate = async (accessToken: string) => {
    try {
      webStorage.setItem('access_token', accessToken);

      const { data } = await refetch();

      if (!data) {
        throw new Error('Cannot set auth credentials');
      }

      setAuthCredentials(accessToken, data);
    } catch {
      reset();
      webStorage.removeItem('access_token');
    }
  };

  return {
    accessToken,
    currentUser,
    isAuthenticated,
    isAccessTokenStored,
    authenticate,
    updateCurrentUserData,
  };
};
