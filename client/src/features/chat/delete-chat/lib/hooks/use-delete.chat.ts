import { deleteChatById } from '@/entities/chat';
import { useMutation } from '@tanstack/react-query';

export const useDeleteChat = () => {
  return useMutation({
    mutationFn: deleteChatById,
  });
};
