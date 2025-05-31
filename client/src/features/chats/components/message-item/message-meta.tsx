import { cn } from '@/utils/cn';
import { ClockIcon } from '@heroicons/react/16/solid';

import { Message } from '../../types';

type MessageMetaProps = {
  message: Message;
  participantMessage: boolean;
};

export const MessageMeta = ({ message, participantMessage }: Readonly<MessageMetaProps>) => (
  <div className="mt-1.5 flex justify-end">
    <span
      className={cn('inline-flex items-center gap-1 text-xs', {
        'text-message-time': participantMessage,
        'text-body': !participantMessage,
      })}
    >
      <ClockIcon width={14} height={14} /> {new Date(message.createdAt).toLocaleString()}
    </span>
  </div>
);
