import { createChat } from '@/entities/chat';
import { useAuth } from '@/shared';
import { useMutation } from '@tanstack/react-query';

export const useCreateChat = () => {
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: (participantId?: number | null) =>
      createChat([currentUser?.id as number, participantId as number]),
  });
};
