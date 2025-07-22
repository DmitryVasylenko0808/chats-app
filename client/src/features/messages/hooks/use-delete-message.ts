import { useMutation } from '@tanstack/react-query';

import { deleteMessage } from '../../../entities/message/api';

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: deleteMessage,
  });
};
