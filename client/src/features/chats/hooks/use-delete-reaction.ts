import { useMutation } from '@tanstack/react-query';

import { deleteReaction } from '../api';

export const useDeleteReaction = () => {
  return useMutation({ mutationFn: deleteReaction });
};
