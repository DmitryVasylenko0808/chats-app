import { useMutation } from '@tanstack/react-query';

import { sendMessage } from '../api';

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
