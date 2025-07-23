import { deleteUser } from '@/entities/user';
import { useAuthStore, webStorage } from '@/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUser = () => {
  const { reset } = useAuthStore();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      webStorage.removeItem('access_token');
      reset();
    },
  });
};
