import { useAuth } from '@/features/auth/hooks';
import { useMutation } from '@tanstack/react-query';

import { createChat } from '../api';
import { useCurrentChatStore } from '../store';

export const useCreateChat = () => {
  const { currentUser } = useAuth();
  const { setCurrentChat } = useCurrentChatStore();

  return useMutation({
    mutationFn: (participantId?: number | null) =>
      createChat([currentUser?.id as number, participantId as number]),
    onSuccess: (data) => {
      setCurrentChat(data.id);
    },
  });
};
