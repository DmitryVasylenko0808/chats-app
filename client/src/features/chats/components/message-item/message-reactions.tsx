import { Message, Reaction, User } from '@/entities';
import { cn } from '@/utils/cn';

type MessageReactionsProps = {
  participantMessage: boolean;
  reactions?: Message['reactionsByEmoji'];
  currentUser?: User | null;
  onAddReaction?: (emoji: string) => void;
  onDeleteReaction?: (emoji: string) => void;
};
export const MessageReactions = ({
  reactions,
  participantMessage,
  currentUser,
  onAddReaction,
  onDeleteReaction,
}: Readonly<MessageReactionsProps>) => {
  if (!reactions) {
    return null;
  }

  const isOwnReaction = (reactions: Reaction[]) =>
    !!reactions.find((r) => r.userId === currentUser?.id);

  const handleClickReaction = (emoji: string, reactions: Reaction[]) => {
    if (isOwnReaction(reactions)) {
      onDeleteReaction?.(emoji);
    } else {
      onAddReaction?.(emoji);
    }
  };

  return (
    <div className="mt-1.5">
      <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
        {Object.entries(reactions).map(([emoji, reactions]) => (
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
