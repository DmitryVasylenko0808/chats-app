import { cn } from '@/utils/cn';
import { ClockIcon } from '@heroicons/react/16/solid';

import { Message } from '../types';
import { MessageMenu } from './message-menu';

type MessageProps = {
  message: Message;
  participantMessage: boolean;
  onEdit?: () => void;
  onReply?: () => void;
  onForward?: () => void;
  onDelete?: () => void;
};

export const MessageItem = ({
  message,
  participantMessage,
  onEdit,
  onReply,
  onForward,
  onDelete,
}: Readonly<MessageProps>) => {
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
            {message.replyToMessage && (
              <div
                className={cn('mb-1.5 rounded-xl p-2.5', {
                  'bg-reply-user-message': !participantMessage,
                  'bg-primary-light text-white': participantMessage,
                })}
              >
                <h6 className="font-semibold">
                  {message.replyToMessage.sender?.name || 'Deleted Account'}
                </h6>
                <p>{message.replyToMessage.text}</p>
              </div>
            )}
            {message.forwardedMessage && (
              <div
                className={cn('mb-1.5 rounded-xl p-2.5', {
                  'bg-reply-user-message': !participantMessage,
                  'bg-primary-light text-white': participantMessage,
                })}
              >
                <h6 className="font-semibold">
                  Forwarded from {message.forwardedMessage.sender?.name || 'Deleted Account'}
                </h6>
                <p>{message.forwardedMessage.text}</p>
              </div>
            )}
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
            <MessageMenu
              participantMessage={participantMessage}
              onEdit={onEdit}
              onReply={onReply}
              onForward={onForward}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
