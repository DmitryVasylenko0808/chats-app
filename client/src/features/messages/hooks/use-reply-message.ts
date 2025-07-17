import { useMutation } from '@tanstack/react-query';

import { replyMessage } from '../api';

export const useReplyMessage = () => {
  return useMutation({ mutationFn: replyMessage });
};
