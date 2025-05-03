import { useMutation } from '@tanstack/react-query';

import { signInUser, SignInUserParams } from '../api';
import { useAuth } from './useAuth';

export const useSignInUser = () => {
  const { mutateAsync, mutate, ...mutationResult } = useMutation({ mutationFn: signInUser });
  const { authenticate } = useAuth();

  const signIn = (data: SignInUserParams) => {
    return mutateAsync(data, {
      onSuccess: (data) => authenticate(data.accessToken),
    });
  };

  return { signIn, ...mutationResult };
};
