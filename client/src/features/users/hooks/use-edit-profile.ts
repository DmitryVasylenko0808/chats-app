import { useMutation } from '@tanstack/react-query';

import { updateUser, UpdateUserParams } from '../api';

export const useEditProfile = () => {
  const { mutateAsync, mutate, ...mutationResult } = useMutation({ mutationFn: updateUser });

  const editProfile = (data: UpdateUserParams) => mutateAsync(data);

  return { editProfile, ...mutationResult };
};
