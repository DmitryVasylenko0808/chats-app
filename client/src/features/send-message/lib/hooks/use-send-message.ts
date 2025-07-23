import { sendMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
