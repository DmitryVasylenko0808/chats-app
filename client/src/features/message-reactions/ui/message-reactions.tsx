import { Message } from '@/entities/message';
import { Reaction } from '@/entities/reaction';
import { User } from '@/entities/user';
import { cn } from '@/shared';

import { useAddReaction } from '../hooks/use-add-reaction';
import { useDeleteReaction } from '../hooks/use-delete-reaction';

type MessageReactionsProps = {
  message: Message;
  participantMessage: boolean;
  currentUser?: User | null;
};
export const MessageReactions = ({
  message,
  participantMessage,
  currentUser,
}: Readonly<MessageReactionsProps>) => {
  if (!message.reactionsByEmoji || !Object.keys(message.reactionsByEmoji).length) {
    return null;
  }

  const { mutateAsync: addReaction } = useAddReaction();
  const { mutateAsync: deleteReaction } = useDeleteReaction();

  const isOwnReaction = (reactions: Reaction[]) =>
    !!reactions.find((r) => r.userId === currentUser?.id);

  const handleClickReaction = (emoji: string, reactions: Reaction[]) => {
    if (isOwnReaction(reactions)) {
      deleteReaction({ messageId: message.id, emoji });
    } else {
      addReaction({ messageId: message.id, emoji });
    }
  };

  return (
    <div className="mt-1.5">
      <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
        {Object.entries(message.reactionsByEmoji).map(([emoji, reactions]) => (
          <MessageReactionItem
            emoji={emoji}
            reactions={reactions}
            isOwnMessage={participantMessage === false}
            isOwnReaction={isOwnReaction(reactions)}
            key={emoji}
            onClick={() => handleClickReaction(emoji, reactions)}
          />
        ))}
      </ul>
    </div>
  );
};

type MessageReactionItemProps = {
  emoji: string;
  reactions: Reaction[];
  isOwnMessage: boolean;
  isOwnReaction: boolean;
  onClick: () => void;
};
const MessageReactionItem = ({
  emoji,
  reactions,
  isOwnMessage,
  isOwnReaction,
  onClick,
}: Readonly<MessageReactionItemProps>) => (
  <li
    className={cn('inline-flex cursor-pointer rounded-2xl px-2 py-0.5 text-sm', {
      'bg-primary-200 text-secondary-100': isOwnMessage && isOwnReaction,
      'bg-secondary-300 dark:bg-dark-200 dark:text-secondary-100 text-black':
        isOwnMessage && !isOwnReaction,
      'bg-secondary-200 text-black': !isOwnMessage && isOwnReaction,
      'bg-primary-100 text-secondary-100': !isOwnMessage && !isOwnReaction,
    })}
    onClick={onClick}
  >{`${emoji} ${reactions.length}`}</li>
);
