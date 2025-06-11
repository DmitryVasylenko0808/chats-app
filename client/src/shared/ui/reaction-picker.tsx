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
      className={cn('border-body/30 rounded-full border bg-white px-2 py-1', className)}
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
