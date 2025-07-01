import { webStorage } from '@/config/web-storage';
import { useAuthStore } from '@/features/auth/store';
import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '../api';

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
