import { useAuth } from '@/features/auth/hooks';

import { Bookmark } from '../types';
import { BookmarkItem } from './bookmark-item';

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
        <BookmarkItem
          bookmark={b}
          isOwnMessage={b.message.senderId === currentUser?.id}
          key={b.id}
          onCopy={() => onCopyItem?.(b)}
          onDelete={() => onDeleteItem?.(b)}
        />
      ))}
    </ul>
  );
};
