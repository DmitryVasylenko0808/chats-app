import { Message } from '@/entities/message';
import { cn } from '@/shared/lib/utils/cn';

import { ComponentProps } from 'react';

import { useAddReaction } from '../hooks/use-add-reaction';

export const defaultReactions = ['👍', '❤️', '😀', '😢', '🙏', '👎', '😡'];

type ReactionPickerProps = ComponentProps<'div'> & {
  message: Message;
  reactions?: string[];
};

export const ReactionPicker = ({
  message,
  reactions,
  className,
  ...divProps
}: Readonly<ReactionPickerProps>) => {
  const { mutateAsync: addReaction } = useAddReaction();

  const handleClickReaction = (emoji: string) => {
    addReaction({ messageId: message.id, emoji });
  };

  const data = reactions || defaultReactions;

  return (
    <div
      className={cn(
        'border-secondary-300 bg-secondary-100 dark:bg-dark-300 dark:border-dark-100 my-1 rounded-full border px-2 py-1',
        className
      )}
      {...divProps}
    >
      <ul className="flex">
        {data.map((reaction, index) => (
          <li
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center text-2xl duration-100 hover:scale-125"
            key={index}
            onClick={() => handleClickReaction(reaction)}
          >
            {reaction}
          </li>
        ))}
      </ul>
    </div>
  );
};
