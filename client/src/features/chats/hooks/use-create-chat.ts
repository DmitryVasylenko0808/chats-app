import { useAuth } from '@/shared';
import { useMutation } from '@tanstack/react-query';

import { createChat } from '../api';

export const useCreateChat = () => {
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: (participantId?: number | null) =>
      createChat([currentUser?.id as number, participantId as number]),
  });
};
