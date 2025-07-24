import { addReaction } from '@/entities/reaction/api';
import { useMutation } from '@tanstack/react-query';

export const useAddReaction = () => {
  return useMutation({ mutationFn: addReaction });
};
