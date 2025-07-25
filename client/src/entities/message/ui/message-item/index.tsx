import { Message } from '@/entities/message';
import { cn, Typograpghy } from '@/shared';

import { EmbeddedMessage } from './embedded-message';
import { MessageAvatar } from './message-avatar';
import { MessageContent } from './message-content';
import { MessageImages } from './message-images';
import { MessageMeta } from './message-meta';
import { MessageSender } from './message-sender';

type MessageItemProps = {
  message: Message;
  isParticipantMessage: boolean;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
};

export const MessageItem = ({
  message,
  isParticipantMessage,
  extra,
  actions,
}: Readonly<MessageItemProps>) => {
  return (
    <div
      className={cn('flex', {
        'flex-row': isParticipantMessage,
        'flex-row-reverse': !isParticipantMessage,
      })}
    >
      <MessageAvatar sender={message.sender} />
      <div className="flex-1">
        <MessageSender sender={message.sender} isParticipantMessage={isParticipantMessage} />
        <div
          className={cn('flex', {
            'mr-72 flex-row': isParticipantMessage,
            'ml-72 flex-row-reverse': !isParticipantMessage,
          })}
        >
          <MessageContent isParticipantMessage={isParticipantMessage}>
            <EmbeddedMessage
              variant="reply"
              message={message.replyToMessage}
              isParticipantMessage={isParticipantMessage}
            />
            <EmbeddedMessage
              variant="forward"
              message={message.forwardedMessage}
              isParticipantMessage={isParticipantMessage}
            />
            <Typograpghy
              className={cn('mb-1.5', {
                'dark:text-secondary-100 text-black': isParticipantMessage,
                'text-secondary-100': !isParticipantMessage,
              })}
            >
              {message.text}
            </Typograpghy>
            <MessageImages images={message.images} />
            {extra}
            <MessageMeta message={message} isParticipantMessage={isParticipantMessage} />
          </MessageContent>
          {actions}
        </div>
      </div>
    </div>
  );
};
