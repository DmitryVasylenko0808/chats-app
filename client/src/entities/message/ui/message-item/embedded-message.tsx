import { Message } from '@/entities/message';
import { cn, Typograpghy } from '@/shared';

import { MessageImages } from './message-images';

type EmbeddedMessageProps = {
  variant: 'reply' | 'forward';
  isParticipantMessage: boolean;
  message?: Message;
};

export const EmbeddedMessage = ({
  variant,
  isParticipantMessage,
  message,
}: Readonly<EmbeddedMessageProps>) => {
  if (!message) {
    return null;
  }

  const senderName = message.sender?.name || 'Deleted Account';
  const title = variant === 'reply' ? senderName : `Forwarded from ${senderName}`;

  return (
    <div
      className={cn('mb-1.5 rounded-xl p-2.5', {
        'bg-secondary-300 dark:bg-dark-200': isParticipantMessage,
        'bg-primary-100 text-secondary-100': !isParticipantMessage,
      })}
    >
      <Typograpghy tagVariant="h6" className={cn({ 'text-secondary-100': !isParticipantMessage })}>
        {title}
      </Typograpghy>
      <Typograpghy
        className={cn({
          'dark:text-secondary-100 text-black': isParticipantMessage,
          'text-secondary-100': !isParticipantMessage,
        })}
      >
        {message.text}
      </Typograpghy>
      <MessageImages images={message.images} />
    </div>
  );
};
