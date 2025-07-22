import { Message, MessageItem } from '@/entities/message';
import { MessageReactions } from '@/features/reactions/components';
import { useAuth } from '@/shared';

import { MessageMenu } from './message-menu';

// part of widget
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

  const isParticipant = (senderId: Message['senderId']) => senderId !== currentUser?.id;

  return (
    <ul className="flex flex-col space-y-4">
      {messages.map((m) => (
        <li className="block" key={m.id}>
          <MessageItem
            message={m}
            isParticipantMessage={isParticipant(m.senderId)}
            extra={
              <MessageReactions
                message={m}
                participantMessage={isParticipant(m.senderId)}
                currentUser={currentUser}
              />
            }
            actions={
              <MessageMenu
                message={m}
                participantMessage={isParticipant(m.senderId)}
                onReply={() => onReplyItem?.(m)}
                onForward={() => onForwardItem?.(m)}
                onPin={() => onPinItem?.(m)}
                onCopy={() => onCopyItem?.(m)}
                onEdit={isParticipant(m.senderId) ? () => onEditItem?.(m) : undefined}
                onDelete={isParticipant(m.senderId) ? () => onDeleteItem?.(m) : undefined}
                onAddBookmark={() => onAddBookmarkItem?.(m)}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
