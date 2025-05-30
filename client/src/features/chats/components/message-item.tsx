import { cn } from '@/utils/cn';
import { ClockIcon } from '@heroicons/react/16/solid';

import { PropsWithChildren } from 'react';

import { Message } from '../types';
import { MessageMenu } from './message-menu';

type MessageItemProps = {
  message: Message;
  participantMessage: boolean;
  onReply?: () => void;
  onForward?: () => void;
  onPin?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const MessageItem = ({
  message,
  participantMessage,
  onReply,
  onForward,
  onPin,
  onEdit,
  onDelete,
}: Readonly<MessageItemProps>) => {
  return (
    <li
      className={cn('flex', {
        'flex-row': participantMessage,
        'flex-row-reverse': !participantMessage,
      })}
    >
      <MessageAvatar src={message.sender?.avatar} />
      <div className="flex-1">
        <MessageSender sender={message.sender} participantMessage={participantMessage} />
        <div
          className={cn('flex gap-1.5', {
            'mr-44 flex-row': participantMessage,
            'ml-44 flex-row-reverse': !participantMessage,
          })}
        >
          <MessageContent participantMessage={participantMessage}>
            <EmbeddedMessage
              variant="reply"
              message={message.replyToMessage}
              participantMessage={participantMessage}
            />
            <EmbeddedMessage
              variant="forward"
              message={message.forwardedMessage}
              participantMessage={participantMessage}
            />
            <p
              className={cn('mb-1.5', {
                'text-white': participantMessage,
                'text-black': !participantMessage,
              })}
            >
              {message.text}
            </p>
            <MessageImages images={message.images} />
            <MessageMeta message={message} participantMessage={participantMessage} />
          </MessageContent>
          <div className="">
            <MessageMenu
              participantMessage={participantMessage}
              onReply={onReply}
              onForward={onForward}
              onPin={onPin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

type MessageAvatarProps = { src?: string };
const MessageAvatar = ({ src }: Readonly<MessageAvatarProps>) => (
  <div className="mx-3 w-10">
    <img src={src} alt="sender-avatar" className="h-10 w-10 rounded-full" />
  </div>
);

type MessageSenderProps = { participantMessage: boolean; sender?: Message['sender'] };
const MessageSender = ({ participantMessage, sender }: Readonly<MessageSenderProps>) => {
  return (
    <h5
      className={cn('mb-0.5 font-semibold', {
        'text-left': participantMessage,
        'text-right': !participantMessage,
      })}
    >
      {sender?.name || 'Deleted Account'}
    </h5>
  );
};

type MessageContentProps = { participantMessage: boolean } & PropsWithChildren;
const MessageContent = ({ participantMessage, children }: Readonly<MessageContentProps>) => {
  return (
    <div
      className={cn('rounded-2xl px-5 py-3', {
        'bg-primary': participantMessage,
        'bg-current-user-message': !participantMessage,
      })}
    >
      {children}
    </div>
  );
};

type EmbeddedMessageProps = {
  variant: 'reply' | 'forward';
  participantMessage: boolean;
  message?: Message;
};
const EmbeddedMessage = ({
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
        'bg-reply-user-message': !participantMessage,
        'bg-primary-light text-white': participantMessage,
      })}
    >
      <h6 className="font-semibold">{title}</h6>
      <p>{message.text}</p>
      <MessageImages images={message.images} />
    </div>
  );
};

type MessageImagesProps = { images: string[] };
const MessageImages = ({ images }: Readonly<MessageImagesProps>) => {
  if (!images.length) {
    return null;
  }

  return (
    <ul className="mt-1.5 flex gap-2">
      {images.map((img) => (
        <li key={img}>
          <img src={img} className="h-28 w-28 rounded-xl" alt={`image-${img}`} />
        </li>
      ))}
    </ul>
  );
};

type MessageMetaProps = {
  message: Message;
  participantMessage: boolean;
};
const MessageMeta = ({ message, participantMessage }: Readonly<MessageMetaProps>) => (
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
