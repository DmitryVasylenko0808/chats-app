import { Bookmark } from '@/entities';
import { MessageItem } from '@/features/chats/components';

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
        reactionsEnabled={false}
        onCopy={onCopy}
        onDelete={onDelete}
      />
    </li>
  );
};
