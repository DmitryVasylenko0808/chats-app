import { useAuthStore } from '@/features/auth/store';
import { useMutation } from '@tanstack/react-query';

import { updateUser } from '../api';

export const useEditProfile = () => {
  const { updateCurrentUserData } = useAuthStore();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedData) => {
      const { id, ...updatedUser } = updatedData;

      updateCurrentUserData(updatedUser);
    },
  });
};
