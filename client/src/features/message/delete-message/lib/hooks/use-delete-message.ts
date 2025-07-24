import { deleteMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: deleteMessage,
  });
};
