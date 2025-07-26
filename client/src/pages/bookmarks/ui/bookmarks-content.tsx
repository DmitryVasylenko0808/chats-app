import { useGetBookmarks } from '@/entities/bookmark';
import { isParticipant, MessageItem } from '@/entities/message';
import { useAuth } from '@/shared';

import { useEffect, useRef } from 'react';

import { BookmarkActionsMenu } from './bookmark-actions-menu';
import { BookmarksEmpty } from './bookmarks-empty';

export const BookmarksContent = () => {
  const { data } = useGetBookmarks();
  const { currentUser } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px)] overflow-auto">
      {!data?.length ? (
        <BookmarksEmpty />
      ) : (
        <div className="p-6">
          <ul className="space-y-4">
            {data.map((b) => (
              <li key={b.id}>
                <MessageItem
                  message={b.message}
                  isParticipantMessage={isParticipant(currentUser?.id, b.message.senderId)}
                  actions={
                    <BookmarkActionsMenu
                      bookmark={b}
                      isParticipant={isParticipant(currentUser?.id, b.message.senderId)}
                    />
                  }
                />
              </li>
            ))}
          </ul>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
