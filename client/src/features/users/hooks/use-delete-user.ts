import { useAuthStore } from '@/features/auth/store';
import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '../api';

export const useDeleteUser = () => {
  const { reset } = useAuthStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem('access_token');
      reset();
    },
  });
};
