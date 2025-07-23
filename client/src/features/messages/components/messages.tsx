import { Message, useGetMessages } from '@/entities/message';
import { useAddBookmark } from '@/features/bookmarks/hooks';
import { useDeleteMessage } from '@/features/delete-message';
import { EditMessageModal } from '@/features/edit-message';
import { ForwardMessageModal } from '@/features/forward-message';
import { MessagesList, PinnedMessage } from '@/features/messages/components';
import { usePinMessage, useUnpinMessage } from '@/features/messages/hooks';
import { ReplyMessageModal } from '@/features/reply-message';
import { Loader, Typograpghy, useAlerts, useCopy } from '@/shared';

import { useEffect, useRef, useState } from 'react';

// Widget "ChatMessages"
type MessagesProps = {
  chatId: number;
};

export const Messages = ({ chatId }: MessagesProps) => {
  const { data, isLoading, error } = useGetMessages(chatId);
  const { mutateAsync: pinMessage } = usePinMessage();
  const { mutateAsync: unpinMessage } = useUnpinMessage();
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

  const handleUnpinMessage = (message: Message) => {
    unpinMessage({ chatId: message.chatId, messageId: message.id })
      .then(() => notify({ variant: 'success', text: 'Successfully unpinned!' }))
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

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Typograpghy>{error.message}</Typograpghy>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <Typograpghy>No messages</Typograpghy>
      </div>
    );
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
