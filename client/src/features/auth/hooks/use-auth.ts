import { serverUploadssUrl } from '@/config/contants';
import { useQuery } from '@tanstack/react-query';

import { getMe } from '../api';
import { useAuthStore } from '../store';

export const useAuth = () => {
  const { currentUser, accessToken: storedAccessToken, setAuthCredentials, reset } = useAuthStore();
  const { refetch } = useQuery({
    queryKey: ['curr'],
    queryFn: getMe,
    enabled: false,
    retry: false,
    select: (data) => ({ ...data, avatar: `${serverUploadssUrl}/${data.avatar}` }),
  });

  const accessToken = localStorage.getItem('access_token');
  const isAuthenticated = !!accessToken;
  const isAccessTokenStored = !!storedAccessToken;

  const authenticate = async (accessToken: string) => {
    try {
      localStorage.setItem('access_token', accessToken);

      const { data } = await refetch();

      if (!data) {
        throw new Error('Cannot set auth credentials');
      }

      setAuthCredentials(accessToken, data);
    } catch {
      reset();
      localStorage.removeItem('access_token');
    }
  };

  return { accessToken, currentUser, isAuthenticated, isAccessTokenStored, authenticate };
};
