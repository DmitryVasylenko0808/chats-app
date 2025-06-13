import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

export const defaultReactions = ['👍', '❤️', '😀', '😢', '🙏', '👎', '😡'];

type ReactionPickerProps = ComponentProps<'div'> & {
  reactions?: string[];
  onClickReaction: (reaction: string) => void;
};

export const ReactionPicker = ({
  onClickReaction,
  reactions,
  className,
  ...divProps
}: Readonly<ReactionPickerProps>) => {
  const data = reactions || defaultReactions;

  return (
    <div
      className={cn(
        'border-secondary-300 bg-secondary-100 dark:bg-dark-300 dark:border-dark-100 rounded-full border px-2 py-1',
        className
      )}
      {...divProps}
    >
      <ul className="flex">
        {data.map((reaction, index) => (
          <li
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center text-2xl duration-100 hover:scale-125"
            key={index}
            onClick={() => onClickReaction(reaction)}
          >
            {reaction}
          </li>
        ))}
      </ul>
    </div>
  );
};
