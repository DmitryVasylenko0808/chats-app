import { Message } from '@/entities/message';
import { cn } from '@/shared';

import { AiOutlineClockCircle } from 'react-icons/ai';

type MessageMetaProps = {
  message: Message;
  isParticipantMessage: boolean;
};

export const MessageMeta = ({ message, isParticipantMessage }: Readonly<MessageMetaProps>) => (
  <div className="mt-1.5 flex justify-end gap-2">
    {message.createdAt !== message.updatedAt && (
      <span
        className={cn('inline-flex items-center gap-1 text-xs', {
          'text-meta-100': !isParticipantMessage,
          'text-meta-200': isParticipantMessage,
        })}
      >
        edited
      </span>
    )}
    <span
      className={cn('inline-flex items-center gap-1 text-xs', {
        'text-meta-100': !isParticipantMessage,
        'text-meta-200': isParticipantMessage,
      })}
    >
      <AiOutlineClockCircle size={14} /> {new Date(message.createdAt).toLocaleString()}
    </span>
  </div>
);
