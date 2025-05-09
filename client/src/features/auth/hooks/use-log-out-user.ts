import { useCurrentChatStore } from '@/features/chats/store';

import { useAuthStore } from '../store';

export const useLogOutUser = () => {
  const { reset: resetAuth } = useAuthStore();
  const { reset: resetCurrentChat } = useCurrentChatStore();

  const logOut = () => {
    localStorage.removeItem('access_token');
    resetCurrentChat();
    resetAuth();
  };

  return logOut;
};
