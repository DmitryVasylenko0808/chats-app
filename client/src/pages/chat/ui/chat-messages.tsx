import { Message, useGetMessages } from '@/entities/message';
import { useAddBookmark } from '@/features/bookmark/add-bookmark';
import { useDeleteMessage } from '@/features/message/delete-message';
import { EditMessageModal } from '@/features/message/edit-message';
import { ForwardMessageModal } from '@/features/message/forward-message';
import { PinnedMessage, usePinMessage } from '@/features/message/pin-message';
import { ReplyMessageModal } from '@/features/message/reply-message';
import { useAlerts, useCopy } from '@/shared';

import { useEffect, useRef, useState } from 'react';

import { ChatMessagesEmpty } from './chat-messages-empty';
import { ChatMessagesError } from './chat-messages-error';
import { ChatMessagesLoading } from './chat-messages-loading';
import { MessagesList } from './messages-list';

type ChatMessagesProps = {
  chatId: number;
};

export const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const { data, isLoading, error } = useGetMessages(chatId);
  const { mutateAsync: pinMessage } = usePinMessage();
  const { mutateAsync: deleteMessage } = useDeleteMessage();
  const { mutateAsync: addBookmark } = useAddBookmark();
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
  const handleClickReply = (message: Message) => setReplyingMessage(message);
  const handleClickCloseReply = () => setReplyingMessage(null);
  const handleClickForward = (message: Message) => setForwardingMessage(message);
  const handleClickCloseForward = () => setForwardingMessage(null);

  const handlePinMessage = (message: Message) => {
    pinMessage({ chatId: message.chatId, messageId: message.id })
      .then(() => notify({ variant: 'success', text: 'Successfully pinned!' }))
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  const handleDeleteMessage = (message: Message) => {
    deleteMessage({ chatId: message.chatId, messageId: message.id }).catch((err) =>
      notify({ variant: 'error', title: 'Error', text: err.message })
    );
  };

  const handleClickBookmark = (message: Message) => {
    addBookmark({ messageId: message.id })
      .then(() =>
        notify({ variant: 'success', title: 'Success', text: 'Message is added to bookmarks' })
      )
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  const handleClickCopy = (message: Message) => {
    handleCopy(message.text)
      .then(() => notify({ variant: 'success', text: 'Copied!' }))
      .catch(() => notify({ variant: 'error', title: 'Error', text: 'Cannot copy text message' }));
  };

  if (isLoading) return <ChatMessagesLoading />;
  if (error) return <ChatMessagesError errorMessage={error.message} />;
  if (!data?.length) return <ChatMessagesEmpty />;

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px-96px)] overflow-y-auto">
      <PinnedMessage pinnedMessage={data.find((m) => m.isPinned)} />
      <div className="p-6">
        <MessagesList
          messages={data}
          onReplyItem={handleClickReply}
          onForwardItem={handleClickForward}
          onPinItem={handlePinMessage}
          onCopyItem={handleClickCopy}
          onEditItem={handleClickEdit}
          onDeleteItem={handleDeleteMessage}
          onAddBookmarkItem={handleClickBookmark}
        />
        <div ref={bottomRef} />
      </div>
      {editableMessage && (
        <EditMessageModal
          open={!!editableMessage}
          message={editableMessage}
          onClose={handleClickCloseEdit}
        />
      )}
      {replyingMessage && (
        <ReplyMessageModal
          open={!!replyingMessage}
          message={replyingMessage}
          onClose={handleClickCloseReply}
        />
      )}
      {forwardingMessage && (
        <ForwardMessageModal
          open={!!forwardingMessage}
          message={forwardingMessage}
          onClose={handleClickCloseForward}
        />
      )}
    </div>
  );
};
