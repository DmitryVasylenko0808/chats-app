import { useMutation } from '@tanstack/react-query';

import { signInUser, SignInUserParams } from '../api';

export const useSignInUser = () => {
  const { mutateAsync, mutate, ...mutationResult } = useMutation({ mutationFn: signInUser });

  const signIn = (data: SignInUserParams) => {
    return mutateAsync(data, {
      onSuccess: (data) => localStorage.setItem('access_token', data.accessToken),
    });
  };

  return { signIn, ...mutationResult };
};
