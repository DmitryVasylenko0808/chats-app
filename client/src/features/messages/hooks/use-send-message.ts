import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '../../../entities/message/api';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
