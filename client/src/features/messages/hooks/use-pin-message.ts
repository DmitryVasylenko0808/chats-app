import { useMutation } from '@tanstack/react-query';

import { pinMessage } from '../../../entities/message/api';

export const usePinMessage = () => {
  return useMutation({ mutationFn: pinMessage });
};
