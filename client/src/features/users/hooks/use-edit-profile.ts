import { useAuth } from '@/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUser } from '../api';

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const { updateCurrentUserData } = useAuth();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedData) => {
      const { id, ...updatedUser } = updatedData;

      queryClient.invalidateQueries({ queryKey: ['users', id] });
      updateCurrentUserData(updatedUser);
    },
  });
};
