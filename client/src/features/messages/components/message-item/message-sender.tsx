import { Message } from '@/entities';
import { cn, Typograpghy } from '@/shared';

import { Link, useLocation } from 'react-router';

type MessageSenderProps = { participantMessage: boolean; sender?: Message['sender'] };

export const MessageSender = ({ participantMessage, sender }: Readonly<MessageSenderProps>) => {
  const location = useLocation();

  return (
    <Typograpghy
      tagVariant="h5"
      className={cn('mb-0.5 text-sm', {
        'text-left': participantMessage,
        'text-right': !participantMessage,
      })}
    >
      <Link to={`/profile/${sender?.id}`} state={{ backgroundLocation: location }}>
        {sender?.name || 'Deleted Account'}
      </Link>
    </Typograpghy>
  );
};
