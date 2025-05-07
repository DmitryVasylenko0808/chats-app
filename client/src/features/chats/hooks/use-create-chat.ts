import { useAuth } from '@/features/auth/hooks';
import { useMutation } from '@tanstack/react-query';

import { createChat } from '../api';
import { useCurrentChatStore } from '../store';

export const useCreateChat = () => {
  const { currentUser } = useAuth();
  const { setCurrentChat } = useCurrentChatStore();
  const { mutateAsync, mutate, ...mutationResult } = useMutation({
    mutationKey: ['chats'],
    mutationFn: createChat,
    onSuccess: (data) => {
      setCurrentChat(data.id);
    },
  });

  const createNewChat = (participantId?: number | null) => {
    return mutateAsync([participantId as number, currentUser?.id as number]);
  };

  return { createNewChat, ...mutationResult };
};
