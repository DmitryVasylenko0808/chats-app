import { useMutation } from '@tanstack/react-query';

import { addReaction } from '../api';

export const useAddReaction = () => {
  return useMutation({ mutationFn: addReaction });
};
