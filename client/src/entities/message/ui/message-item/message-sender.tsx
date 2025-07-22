import { Message } from '@/entities/message';
import { cn, Typograpghy } from '@/shared';

import { Link, useLocation } from 'react-router';

type MessageSenderProps = { isParticipantMessage: boolean; sender?: Message['sender'] };

export const MessageSender = ({ isParticipantMessage, sender }: Readonly<MessageSenderProps>) => {
  const location = useLocation();

  return (
    <Typograpghy
      tagVariant="h5"
      className={cn('mb-0.5 text-sm', {
        'text-left': isParticipantMessage,
        'text-right': !isParticipantMessage,
      })}
    >
      <Link to={`/profile/${sender?.id}`} state={{ backgroundLocation: location }}>
        {sender?.name || 'Deleted Account'}
      </Link>
    </Typograpghy>
  );
};
