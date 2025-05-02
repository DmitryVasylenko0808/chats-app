import { useMutation } from '@tanstack/react-query';

import { registerUser } from '../api';

export const useRegisterUser = () => {
  return useMutation({ mutationFn: registerUser });
};
