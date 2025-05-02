import { useMutation } from '@tanstack/react-query';

import { registerUser, RegisterUserParams } from '../api';

export const useRegisterUser = () => {
  const { mutateAsync, mutate, ...registerUserResult } = useMutation({ mutationFn: registerUser });

  const registerUserAccount = (data: RegisterUserParams) => {
    return mutateAsync(data);
  };

  return { registerUserAccount, ...registerUserResult };
};
