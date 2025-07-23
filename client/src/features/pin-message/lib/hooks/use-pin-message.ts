import { pinMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const usePinMessage = () => {
  return useMutation({ mutationFn: pinMessage });
};
