import { useAuth } from '@/features/auth/hooks';

import { Message } from '../types';
import { MessageItem } from './message-item';

type MessagesListProps = {
  messages?: Message[];
  onEditItem?: (message: Message) => void;
  onReplyItem?: (message: Message) => void;
  onDeleteItem?: (message: Message) => void;
};

export const MessagesList = ({
  messages = [],
  onEditItem,
  onReplyItem,
  onDeleteItem,
}: Readonly<MessagesListProps>) => {
  const { currentUser } = useAuth();

  return (
    <ul className="flex flex-col space-y-4">
      {messages.map((m) => (
        <MessageItem
          message={m}
          participantMessage={m.senderId !== currentUser?.id}
          key={m.id}
          onEdit={() => onEditItem?.(m)}
          onReply={() => onReplyItem?.(m)}
          onDelete={() => onDeleteItem?.(m)}
        />
      ))}
    </ul>
  );
};
