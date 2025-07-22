import { cn } from '@/shared';

import { PropsWithChildren } from 'react';

type MessageContentProps = { isParticipantMessage: boolean } & PropsWithChildren;

export const MessageContent = ({
  isParticipantMessage,
  children,
}: Readonly<MessageContentProps>) => {
  return (
    <div
      className={cn('rounded-2xl px-5 py-3', {
        'bg-primary-200': isParticipantMessage,
        'bg-secondary-200 dark:bg-dark-300': !isParticipantMessage,
      })}
    >
      {children}
    </div>
  );
};
