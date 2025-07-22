import { updateUser } from '@/entities/user';
import { useAuth } from '@/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
