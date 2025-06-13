import { User } from '@/features/users/types';
import { Typograpghy } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { useAddReaction, useDeleteReaction } from '../../hooks';
import { Message } from '../../types';
import { EmbeddedMessage } from './embedded-message';
import { MessageAvatar } from './message-avatar';
import { MessageContent } from './message-content';
import { MessageImages } from './message-images';
import { MessageMenu } from './message-menu';
import { MessageMeta } from './message-meta';
import { MessageReactions } from './message-reactions';
import { MessageSender } from './message-sender';

type MessageItemProps = {
  message: Message;
  participantMessage: boolean;
  currentUser?: User | null;
  onReply?: () => void;
  onForward?: () => void;
  onPin?: () => void;
  onCopy?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const MessageItem = ({
  message,
  participantMessage,
  currentUser,
  onReply,
  onForward,
  onPin,
  onCopy,
  onEdit,
  onDelete,
}: Readonly<MessageItemProps>) => {
  const { mutateAsync: addReaction } = useAddReaction();
  const { mutateAsync: deleteReaction } = useDeleteReaction();

  const handleAddReaction = (emoji: string) => {
    addReaction({ messageId: message.id, emoji });
  };

  const handleDeleteReaction = (emoji: string) => {
    deleteReaction({ messageId: message.id, emoji });
  };

  return (
    <li
      className={cn('flex', {
        'flex-row': participantMessage,
        'flex-row-reverse': !participantMessage,
      })}
    >
      <MessageAvatar sender={message.sender} />
      <div className="flex-1">
        <MessageSender sender={message.sender} participantMessage={participantMessage} />
        <div
          className={cn('flex', {
            'mr-72 flex-row': participantMessage,
            'ml-72 flex-row-reverse': !participantMessage,
          })}
        >
          <MessageContent participantMessage={participantMessage}>
            <EmbeddedMessage
              variant="reply"
              message={message.replyToMessage}
              participantMessage={participantMessage}
            />
            <EmbeddedMessage
              variant="forward"
              message={message.forwardedMessage}
              participantMessage={participantMessage}
            />
            <Typograpghy
              className={cn('mb-1.5', {
                'text-secondary-100': participantMessage,
                'dark:text-secondary-100 text-black': !participantMessage,
              })}
            >
              {message.text}
            </Typograpghy>
            <MessageImages images={message.images} />
            <MessageReactions
              reactions={message.reactionsByEmoji}
              participantMessage={participantMessage}
              currentUser={currentUser}
              onAddReaction={handleAddReaction}
              onDeleteReaction={handleDeleteReaction}
            />
            <MessageMeta message={message} participantMessage={participantMessage} />
          </MessageContent>
          <MessageMenu
            participantMessage={participantMessage}
            onReply={onReply}
            onForward={onForward}
            onPin={onPin}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddReaction={handleAddReaction}
          />
        </div>
      </div>
    </li>
  );
};
