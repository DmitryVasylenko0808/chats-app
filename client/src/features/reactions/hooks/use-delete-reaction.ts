import { deleteReaction } from '@/entities/reaction/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteReaction = () => {
  return useMutation({ mutationFn: deleteReaction });
};
