import { serverAvatarsUrl } from '@/config/contants';
import { useAuthStore } from '@/features/auth/store';
import { useMutation } from '@tanstack/react-query';

import { updateUser, UpdateUserParams } from '../api';

export const useEditProfile = () => {
  const { mutateAsync, mutate, ...mutationResult } = useMutation({
    mutationFn: updateUser,
  });
  const { updateCurrentUserData } = useAuthStore();

  const editProfile = async (data: UpdateUserParams) => {
    return mutateAsync(data).then((updatedData) => {
      const { id, ...updatedUser } = updatedData.data;
      updatedUser.avatar = `${serverAvatarsUrl}/${updatedUser.avatar}`;

      updateCurrentUserData(updatedUser);

      return updatedData;
    });
  };

  return { editProfile, ...mutationResult };
};
