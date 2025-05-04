import { useAuthStore } from '@/features/auth/store';
import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '../api';

export const useDeleteUser = () => {
  const { mutate, mutateAsync, ...mutationResult } = useMutation({
    mutationKey: ['users'],
    mutationFn: deleteUser,
  });
  const { reset } = useAuthStore();

  const deleteUserAccount = (id: number | null) => {
    return mutateAsync(id, {
      onSuccess: () => {
        localStorage.removeItem('access_token');
        reset();
      },
    });
  };

  return { deleteUserAccount, ...mutationResult };
};
