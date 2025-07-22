import { useMutation } from '@tanstack/react-query';

import { unpinMessage } from '../../../entities/message/api';

export const useUnpinMessage = () => {
  return useMutation({ mutationFn: unpinMessage });
};
