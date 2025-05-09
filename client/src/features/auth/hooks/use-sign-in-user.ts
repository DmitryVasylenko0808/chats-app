import { useMutation } from '@tanstack/react-query';

import { signInUser } from '../api';
import { useAuth } from './use-auth';

export const useSignInUser = () => {
  const { authenticate } = useAuth();

  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => authenticate(data.accessToken),
  });
};
