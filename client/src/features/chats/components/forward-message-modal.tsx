import { Modal, ModalProps } from '@/shared/ui';

import { useGetChats } from '../hooks';
import { Chat, Message } from '../types';
import { ChatsList } from './chats-list';

type ForwardMessageModalProps = ModalProps & {
  message: Message;
  onForward: (message: Message, targetChatId: number) => void;
};

export const ForwardMessageModal = ({
  message,
  onForward,
  ...modalProps
}: Readonly<ForwardMessageModalProps>) => {
  const { data } = useGetChats();

  const handleClick = (chat: Chat) => onForward(message, chat.id);

  return (
    <Modal {...modalProps}>
      <h2 className="mb-6 text-xl font-semibold">Forwarding Message</h2>
      <div className="h-[240px] overflow-auto">
        <ChatsList chats={data} onClickItem={handleClick} />
      </div>
    </Modal>
  );
};
