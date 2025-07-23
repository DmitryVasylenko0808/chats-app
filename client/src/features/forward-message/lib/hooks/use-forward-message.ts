import { forwardMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const useForwardMessage = () => {
  return useMutation({ mutationFn: forwardMessage });
};
