import { cn } from '@/utils/cn';

import { Message } from '../../types';

type MessageSenderProps = { participantMessage: boolean; sender?: Message['sender'] };

export const MessageSender = ({ participantMessage, sender }: Readonly<MessageSenderProps>) => {
  return (
    <h5
      className={cn('mb-0.5 font-semibold', {
        'text-left': participantMessage,
        'text-right': !participantMessage,
      })}
    >
      {sender?.name || 'Deleted Account'}
    </h5>
  );
};
