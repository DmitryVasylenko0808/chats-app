import { Bookmark } from '@/entities/bookmark';
import { isParticipant, MessageItem } from '@/entities/message';
import { useAuth } from '@/shared';

import { BookmarkMessageMenu } from './bookmark-message-menu';

type BookmarksListProps = {
  bookmarks?: Bookmark[];
  onCopyItem?: (bookmark: Bookmark) => void;
  onDeleteItem?: (bookmark: Bookmark) => void;
};

export const BookmarksList = ({
  bookmarks = [],
  onCopyItem,
  onDeleteItem,
}: Readonly<BookmarksListProps>) => {
  const { currentUser } = useAuth();

  return (
    <ul className="space-y-4">
      {bookmarks.map((b) => (
        <li key={b.id}>
          <MessageItem
            message={b.message}
            isParticipantMessage={isParticipant(currentUser?.id, b.message.senderId)}
            actions={
              <BookmarkMessageMenu
                isParticipant={isParticipant(currentUser?.id, b.message.senderId)}
                onCopy={() => onCopyItem?.(b)}
                onDelete={() => onDeleteItem?.(b)}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
