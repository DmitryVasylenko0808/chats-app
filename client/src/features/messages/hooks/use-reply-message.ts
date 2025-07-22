import { useMutation } from '@tanstack/react-query';

import { replyMessage } from '../../../entities/message/api';

export const useReplyMessage = () => {
  return useMutation({ mutationFn: replyMessage });
};
