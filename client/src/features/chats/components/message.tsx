import { cn } from '@/utils/cn';
import { ClockIcon } from '@heroicons/react/16/solid';

import { MessageWithSender } from '../types';
import { MessageMenu } from './message-menu';

type MessageProps = {
  message: MessageWithSender;
  participantMessage: boolean;
};

export const Message = ({ message, participantMessage }: Readonly<MessageProps>) => {
  return (
    <li
      className={cn('flex', {
        'flex-row': participantMessage,
        'flex-row-reverse': !participantMessage,
      })}
    >
      <div className="mx-3 w-10">
        <img src={message.sender?.avatar} alt="sender-avatar" className="h-10 w-10 rounded-full" />
      </div>
      <div className="flex-1">
        <h5
          className={cn('mb-0.5 font-semibold', {
            'text-left': participantMessage,
            'text-right': !participantMessage,
          })}
        >
          {message.sender?.name || 'Deleted Account'}
        </h5>
        <div
          className={cn('flex gap-1.5', {
            'mr-44 flex-row': participantMessage,
            'ml-44 flex-row-reverse': !participantMessage,
          })}
        >
          <div
            className={cn('rounded-2xl px-5 py-3', {
              'bg-primary': participantMessage,
              'bg-current-user-message': !participantMessage,
            })}
          >
            <p
              className={cn('mb-1.5', {
                'text-white': participantMessage,
                'text-black': !participantMessage,
              })}
            >
              {message.text}
            </p>
            <div className="flex justify-end">
              <span
                className={cn('inline-flex items-center gap-1 text-xs', {
                  'text-message-time': participantMessage,
                  'text-body': !participantMessage,
                })}
              >
                <ClockIcon width={14} height={14} /> {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="">
            {!participantMessage && (
              <MessageMenu message={message} participantMessage={participantMessage} />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
