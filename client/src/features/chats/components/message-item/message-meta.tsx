import { Message } from '@/entities';
import { cn } from '@/utils/cn';

import { AiOutlineClockCircle } from 'react-icons/ai';

type MessageMetaProps = {
  message: Message;
  participantMessage: boolean;
};

export const MessageMeta = ({ message, participantMessage }: Readonly<MessageMetaProps>) => (
  <div className="mt-1.5 flex justify-end gap-2">
    {message.createdAt !== message.updatedAt && (
      <span
        className={cn('inline-flex items-center gap-1 text-xs', {
          'text-meta-100': participantMessage,
          'text-meta-200': !participantMessage,
        })}
      >
        edited
      </span>
    )}
    <span
      className={cn('inline-flex items-center gap-1 text-xs', {
        'text-meta-100': participantMessage,
        'text-meta-200': !participantMessage,
      })}
    >
      <AiOutlineClockCircle size={14} /> {new Date(message.createdAt).toLocaleString()}
    </span>
  </div>
);
