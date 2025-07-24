import { editMessage } from '@/entities/message';
import { useMutation } from '@tanstack/react-query';

export const useEditMessage = () => {
  return useMutation({
    mutationFn: editMessage,
  });
};
