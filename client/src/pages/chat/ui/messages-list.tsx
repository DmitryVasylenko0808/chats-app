import { isParticipant, Message, MessageItem } from '@/entities/message';
import { MessageReactions, ReactionPicker } from '@/features/message/message-reactions';
import { useAuth } from '@/shared';

import { MessageMenu } from './message-menu';

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
            isParticipantMessage={isParticipant(currentUser?.id, m.senderId)}
            extra={
              <MessageReactions
                message={m}
                participantMessage={isParticipant(currentUser?.id, m.senderId)}
                currentUser={currentUser}
              />
            }
            actions={
              <MessageMenu
                message={m}
                participantMessage={isParticipant(currentUser?.id, m.senderId)}
                onReply={() => onReplyItem?.(m)}
                onForward={() => onForwardItem?.(m)}
                onPin={() => onPinItem?.(m)}
                onCopy={() => onCopyItem?.(m)}
                onEdit={
                  !isParticipant(currentUser?.id, m.senderId) ? () => onEditItem?.(m) : undefined
                }
                onDelete={
                  !isParticipant(currentUser?.id, m.senderId) ? () => onDeleteItem?.(m) : undefined
                }
                onAddBookmark={() => onAddBookmarkItem?.(m)}
                topSlot={<ReactionPicker message={m} />}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
