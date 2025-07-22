import { useAuth } from '@/shared';
import { useMutation } from '@tanstack/react-query';

import { signInUser } from '../../api';

export const useSignInUser = () => {
  const { authenticate } = useAuth();

  return useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => authenticate(data.accessToken),
  });
};
