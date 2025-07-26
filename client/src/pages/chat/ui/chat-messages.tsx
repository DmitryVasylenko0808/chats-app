import { isParticipant, MessageItem, useGetMessages } from '@/entities/message';
import { MessageReactions, ReactionPicker } from '@/features/message/message-reactions';
import { PinnedMessage } from '@/features/message/pin-message';
import { useAuth } from '@/shared';

import { useEffect, useRef } from 'react';

import { ChatMessagesEmpty } from './chat-messages-empty';
import { ChatMessagesError } from './chat-messages-error';
import { ChatMessagesLoading } from './chat-messages-loading';
import { MessageActionsMenu } from './message-actions-menu';

type ChatMessagesProps = {
  chatId: number;
};

export const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const { data, isLoading, error } = useGetMessages(chatId);
  const { currentUser } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  if (isLoading) return <ChatMessagesLoading />;
  if (error) return <ChatMessagesError errorMessage={error.message} />;
  if (!data?.length) return <ChatMessagesEmpty />;

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px-96px)] overflow-y-auto">
      <PinnedMessage pinnedMessage={data.find((m) => m.isPinned)} />
      <div className="p-6">
        <ul className="flex flex-col space-y-4">
          {data.map((m) => (
            <li className="block" key={m.id}>
              <MessageItem
                message={m}
                isParticipantMessage={isParticipant(currentUser?.id, m.senderId)}
                extra={
                  <MessageReactions
                    message={m}
                    participantMessage={isParticipant(currentUser?.id, m.senderId)}
                    currentUser={currentUser}
                  />
                }
                actions={
                  <MessageActionsMenu
                    message={m}
                    participantMessage={isParticipant(currentUser?.id, m.senderId)}
                    topSlot={<ReactionPicker message={m} />}
                  />
                }
              />
            </li>
          ))}
        </ul>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
