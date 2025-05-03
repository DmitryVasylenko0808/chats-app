import { jwtDecode, JwtPayload } from 'jwt-decode';

import { useAuthStore } from '../store';

type JwtTokenPayload = JwtPayload & { id: number };

export const useAuth = () => {
  const { currentUserId, accessToken: storedAccessToken, setAuthCredentials } = useAuthStore();

  const accessToken = localStorage.getItem('access_token');
  const isAuthenticated = !!accessToken;
  const isAccessTokenStored = !!storedAccessToken;

  const authenticate = (accessToken: string) => {
    const decoded = jwtDecode(accessToken) as JwtTokenPayload;

    setAuthCredentials(decoded.id, accessToken);

    localStorage.setItem('access_token', accessToken);
  };

  return { accessToken, currentUserId, isAuthenticated, isAccessTokenStored, authenticate };
};
