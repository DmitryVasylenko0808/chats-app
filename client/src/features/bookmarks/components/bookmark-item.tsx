import { MessageItem } from '@/features/chats/components';

import { Bookmark } from '../types';
import { BookmarkMenu } from './bookmark-menu';

type BookmarkItemProps = {
  bookmark: Bookmark;
  isOwnMessage: boolean;
  onCopy?: () => void;
  onDelete?: () => void;
};

export const BookmarkItem = ({
  bookmark,
  isOwnMessage,
  onCopy,
  onDelete,
}: Readonly<BookmarkItemProps>) => {
  return (
    <li key={bookmark.id}>
      <MessageItem
        message={bookmark.message}
        participantMessage={!isOwnMessage}
        menu={<BookmarkMenu isOwnMessage={isOwnMessage} onCopy={onCopy} onDelete={onDelete} />}
      />
    </li>
  );
};
