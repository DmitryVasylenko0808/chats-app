import { Loader } from '@/shared/ui';

import { useEffect, useRef, useState } from 'react';

import { useDeleteMessage, useEditMessage, useGetMessages } from '../hooks';
import { Message } from '../types';
import { EditMessageFormFields } from '../validations';
import { EditMessageModal } from './edit-message-modal';
import { MessagesList } from './messages-list';

type MessagesProps = {
  chatId: number;
};

export const Messages = ({ chatId }: MessagesProps) => {
  const { data, isLoading, error } = useGetMessages(chatId);
  const { mutateAsync: editMessage, isPending: isPendingEdit } = useEditMessage();
  const { mutateAsync: deleteMessage } = useDeleteMessage();
  const [editableMessage, setEditableMessage] = useState<Message | null>(null);
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
        alert('Message is edited');
      })
      .catch((err) => alert(err.message));
  };
  const handleDeleteMessage = (message: Message) => {
    deleteMessage({ chatId: message.chatId, messageId: message.id }).catch((err) =>
      alert(err.message)
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (error) {
    alert(error.message);
  }

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px-96px)] overflow-y-auto p-6">
      <MessagesList
        messages={data}
        onEditItem={handleClickEdit}
        onDeleteItem={handleDeleteMessage}
      />
      <div ref={bottomRef} />
      {editableMessage && (
        <EditMessageModal
          open={!!editableMessage}
          message={editableMessage}
          isPending={isPendingEdit}
          onClose={handleClickCloseEdit}
          onEditSubmit={handleEditMessage}
        />
      )}
    </div>
  );
};
