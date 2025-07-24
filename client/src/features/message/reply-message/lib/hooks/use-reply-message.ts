import { replyMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const useReplyMessage = () => {
  return useMutation({ mutationFn: replyMessage });
};
