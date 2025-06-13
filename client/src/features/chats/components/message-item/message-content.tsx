import { cn } from '@/utils/cn';

import { PropsWithChildren } from 'react';

type MessageContentProps = { participantMessage: boolean } & PropsWithChildren;

export const MessageContent = ({ participantMessage, children }: Readonly<MessageContentProps>) => {
  return (
    <div
      className={cn('rounded-2xl px-5 py-3', {
        'bg-primary-200': participantMessage,
        'bg-current-user-message': !participantMessage,
      })}
    >
      {children}
    </div>
  );
};
