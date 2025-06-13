import { Typograpghy } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { Message } from '../../types';

type MessageSenderProps = { participantMessage: boolean; sender?: Message['sender'] };

export const MessageSender = ({ participantMessage, sender }: Readonly<MessageSenderProps>) => {
  return (
    <Typograpghy
      tagVariant="h5"
      className={cn('mb-0.5 text-sm', {
        'text-left': participantMessage,
        'text-right': !participantMessage,
      })}
    >
      {sender?.name || 'Deleted Account'}
    </Typograpghy>
  );
};
