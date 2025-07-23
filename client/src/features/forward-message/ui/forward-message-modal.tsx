import { Chat, ChatsList, useGetChats } from '@/entities/chat';
import { Message } from '@/entities/message';
import { Modal, ModalProps, Typograpghy, useAlerts } from '@/shared';

import { useNavigate } from 'react-router';

import { useForwardMessage } from '../lib/hooks/use-forward-message';

type ForwardMessageModalProps = ModalProps & {
  message: Message;
};

export const ForwardMessageModal = ({
  message,
  ...modalProps
}: Readonly<ForwardMessageModalProps>) => {
  const { data } = useGetChats();
  const { mutateAsync: forwardMessage } = useForwardMessage();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const handleClick = (chat: Chat) => {
    forwardMessage({ chatId: message.chatId, messageId: message.id, targetChatId: chat.id })
      .then(() => {
        modalProps.onClose();
        navigate(`/chats/${chat.id}`);
        notify({ variant: 'success', text: 'Message is forwarded' });
      })
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

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
