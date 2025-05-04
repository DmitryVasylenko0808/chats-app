import { useAuth } from '@/features/auth/hooks';

import { PropsWithChildren } from 'react';

type AuthCheckerProps = PropsWithChildren;

export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const { isAccessTokenStored, accessToken, authenticate } = useAuth();

  if (accessToken && !isAccessTokenStored) {
    authenticate(accessToken);
  }

  return children;
};
