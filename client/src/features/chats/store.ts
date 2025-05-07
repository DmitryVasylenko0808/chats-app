import { create } from 'zustand';

type CurrentChatState = {
  chatId: number;
};

type CurrentChatActions = {
  setCurrentChat: (id: number) => void;
  reset: () => void;
};

type CurrentChatStore = CurrentChatState & CurrentChatActions;

const initialState: CurrentChatState = {
  chatId: 0,
};

export const useCurrentChatStore = create<CurrentChatStore>()((set) => ({
  ...initialState,
  setCurrentChat: (id) => {
    set({ chatId: id });
  },
  reset: () => {
    set(initialState);
  },
}));
