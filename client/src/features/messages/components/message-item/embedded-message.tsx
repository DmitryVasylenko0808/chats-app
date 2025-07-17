import { Message } from '@/entities';
import { Typograpghy } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { MessageImages } from './message-images';

type EmbeddedMessageProps = {
  variant: 'reply' | 'forward';
  participantMessage: boolean;
  message?: Message;
};

export const EmbeddedMessage = ({
  variant,
  participantMessage,
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
        'bg-secondary-300 dark:bg-dark-200': !participantMessage,
        'bg-primary-100 text-secondary-100': participantMessage,
      })}
    >
      <Typograpghy tagVariant="h6" className={cn({ 'text-secondary-100': participantMessage })}>
        {title}
      </Typograpghy>
      <Typograpghy
        className={cn({
          'dark:text-secondary-100 text-black': !participantMessage,
          'text-secondary-100': participantMessage,
        })}
      >
        {message.text}
      </Typograpghy>
      <MessageImages images={message.images} />
    </div>
  );
};
