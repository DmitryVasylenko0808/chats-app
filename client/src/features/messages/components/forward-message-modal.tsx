import { Chat, Message } from '@/entities';
import { ChatsList } from '@/features/chats/components';
import { useGetChats } from '@/features/chats/hooks';
import { Modal, ModalProps, Typograpghy } from '@/shared/ui';

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
      <Typograpghy tagVariant="h2" className="mb-6">
        Forwarding Message
      </Typograpghy>
      <div className="h-[240px] overflow-auto">
        <ChatsList chats={data} onClickItem={handleClick} />
      </div>
    </Modal>
  );
};
