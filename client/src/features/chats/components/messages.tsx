import { useAlerts, useCopy } from '@/shared/hooks';
import { Loader } from '@/shared/ui';

import { useEffect, useRef, useState } from 'react';

import {
  useDeleteMessage,
  useEditMessage,
  useForwardMessage,
  useGetMessages,
  usePinMessage,
  useReplyMessage,
  useUnpinMessage,
} from '../hooks';
import { Message } from '../types';
import { EditMessageFormFields, ReplyMessageFormFields } from '../validations';
import { EditMessageModal } from './edit-message-modal';
import { ForwardMessageModal } from './forward-message-modal';
import { MessagesList } from './messages-list';
import { PinnedMessage } from './pinned-message';
import { ReplyMessageModal } from './reply-message-modal';

type MessagesProps = {
  chatId: number;
};

export const Messages = ({ chatId }: MessagesProps) => {
  const { data, isLoading, error } = useGetMessages(chatId);
  const { mutateAsync: editMessage, isPending: isPendingEdit } = useEditMessage();
  const { mutateAsync: replyMessage, isPending: isPendingReply } = useReplyMessage();
  const { mutateAsync: forwardMessage } = useForwardMessage();
  const { mutateAsync: pinMessage } = usePinMessage();
  const { mutateAsync: unpinMessage } = useUnpinMessage();
  const { mutateAsync: deleteMessage } = useDeleteMessage();
  const { handleCopy } = useCopy();
  const { notify } = useAlerts();
  const [editableMessage, setEditableMessage] = useState<Message | null>(null);
  const [replyingMessage, setReplyingMessage] = useState<Message | null>(null);
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  const handleClickEdit = (message: Message) => setEditableMessage(message);
  const handleClickCloseEdit = () => setEditableMessage(null);
  const handleEditMessage = (message: Message, data: EditMessageFormFields) => {
    editMessage({ chatId: message.chatId, messageId: message.id, ...data })
      .then(() => {
        setEditableMessage(null);
        notify({ variant: 'success', text: 'Message is edited' });
      })
      .catch((err) => notify({ variant: 'error', text: err.message }));
  };

  const handleClickReply = (message: Message) => setReplyingMessage(message);
  const handleClickCloseReply = () => setReplyingMessage(null);
  const handleReplyMessage = (message: Message, data: ReplyMessageFormFields) => {
    replyMessage({ chatId: message.chatId, messageId: message.id, ...data })
      .then(() => {
        setReplyingMessage(null);
        notify({ variant: 'success', text: 'Message is replied' });
      })
      .catch((err) => notify({ variant: 'error', text: err.message }));
  };

  const handleClickForward = (message: Message) => setForwardingMessage(message);
  const handleClickCloseForward = () => setForwardingMessage(null);
  const handleForwardMessage = (message: Message, targetChatId: number) => {
    forwardMessage({ chatId: message.chatId, messageId: message.id, targetChatId })
      .then(() => {
        setForwardingMessage(null);
        notify({ variant: 'success', text: 'Message is forwarded' });
      })
      .catch((err) => notify({ variant: 'error', text: err.message }));
  };

  const handlePinMessage = (message: Message) => {
    pinMessage({ chatId: message.chatId, messageId: message.id })
      .then(() => notify({ variant: 'success', text: 'Successfully pinned!' }))
      .catch((err) => notify({ variant: 'error', text: err.message }));
  };

  const handleUnpinMessage = (message: Message) => {
    unpinMessage({ chatId: message.chatId, messageId: message.id })
      .then(() => notify({ variant: 'success', text: 'Successfully unpinned!' }))
      .catch((err) => notify({ variant: 'error', text: err.message }));
  };

  const handleDeleteMessage = (message: Message) => {
    deleteMessage({ chatId: message.chatId, messageId: message.id }).catch((err) =>
      notify({ variant: 'error', text: err.message })
    );
  };

  const handleClickCopy = (message: Message) => {
    handleCopy(message.text)
      .then(() => notify({ variant: 'success', text: 'Copied!' }))
      .catch(() => notify({ variant: 'error', text: 'Cannot copy text message' }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    notify({ variant: 'error', text: error.message });
  }

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px-96px)] overflow-y-auto">
      <PinnedMessage pinnedMessage={data?.find((m) => m.isPinned)} onUnpin={handleUnpinMessage} />
      <div className="p-6">
        <MessagesList
          messages={data}
          onReplyItem={handleClickReply}
          onForwardItem={handleClickForward}
          onPinItem={handlePinMessage}
          onCopyItem={handleClickCopy}
          onEditItem={handleClickEdit}
          onDeleteItem={handleDeleteMessage}
        />
        <div ref={bottomRef} />
      </div>
      {editableMessage && (
        <EditMessageModal
          open={!!editableMessage}
          message={editableMessage}
          isPending={isPendingEdit}
          onClose={handleClickCloseEdit}
          onEditSubmit={handleEditMessage}
        />
      )}
      {replyingMessage && (
        <ReplyMessageModal
          open={!!replyingMessage}
          message={replyingMessage}
          isPending={isPendingReply}
          onClose={handleClickCloseReply}
          onSubmitReply={handleReplyMessage}
        />
      )}
      {forwardingMessage && (
        <ForwardMessageModal
          open={!!forwardingMessage}
          message={forwardingMessage}
          onClose={handleClickCloseForward}
          onForward={handleForwardMessage}
        />
      )}
    </div>
  );
};
