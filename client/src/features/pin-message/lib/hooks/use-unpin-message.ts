import { unpinMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const useUnpinMessage = () => {
  return useMutation({ mutationFn: unpinMessage });
};
