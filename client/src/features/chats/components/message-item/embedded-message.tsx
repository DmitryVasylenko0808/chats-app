import { cn } from '@/utils/cn';

import { Message } from '../../types';
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
        'bg-secondary-300': !participantMessage,
        'bg-primary-100 text-white': participantMessage,
      })}
    >
      <h6 className="font-semibold">{title}</h6>
      <p>{message.text}</p>
      <MessageImages images={message.images} />
    </div>
  );
};
