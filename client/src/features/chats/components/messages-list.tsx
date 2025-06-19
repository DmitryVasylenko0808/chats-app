import { useAuth } from '@/features/auth/hooks';

import { Message } from '../types';
import { MessageItem } from './message-item';

type MessagesListProps = {
  messages?: Message[];
  onReplyItem?: (message: Message) => void;
  onForwardItem?: (message: Message) => void;
  onPinItem?: (message: Message) => void;
  onCopyItem?: (message: Message) => void;
  onEditItem?: (message: Message) => void;
  onDeleteItem?: (message: Message) => void;
  onAddBookmarkItem?: (message: Message) => void;
};

export const MessagesList = ({
  messages = [],
  onReplyItem,
  onForwardItem,
  onPinItem,
  onCopyItem,
  onEditItem,
  onDeleteItem,
  onAddBookmarkItem,
}: Readonly<MessagesListProps>) => {
  const { currentUser } = useAuth();

  return (
    <ul className="flex flex-col space-y-4">
      {messages.map((m) => (
        <li className="block" key={m.id}>
          <MessageItem
            message={m}
            participantMessage={m.senderId !== currentUser?.id}
            currentUser={currentUser}
            onReply={() => onReplyItem?.(m)}
            onForward={() => onForwardItem?.(m)}
            onPin={() => onPinItem?.(m)}
            onCopy={() => onCopyItem?.(m)}
            onEdit={() => onEditItem?.(m)}
            onDelete={() => onDeleteItem?.(m)}
            onBookmark={() => onAddBookmarkItem?.(m)}
          />
        </li>
      ))}
    </ul>
  );
};
