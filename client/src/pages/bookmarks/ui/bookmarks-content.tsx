import { Bookmark, useGetBookmarks } from '@/entities/bookmark';
import { useDeleteBookmark } from '@/features/bookmark/delete-bookmark';
import { useAlerts, useCopy } from '@/shared';

import { useEffect, useRef } from 'react';

import { BookmarksEmpty } from './bookmarks-empty';
import { BookmarksList } from './bookmarks-list';

export const BookmarksContent = () => {
  const { data } = useGetBookmarks();
  const { mutateAsync: deleteBookmarkMutate } = useDeleteBookmark();
  const { handleCopy } = useCopy();
  const { notify } = useAlerts();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data]);

  const handleClickDelete = (bookmark: Bookmark) => {
    deleteBookmarkMutate({ id: bookmark.id }).catch((err) =>
      notify({ variant: 'error', title: 'Error', text: err.message })
    );
  };

  const handleClickCopy = (bookmark: Bookmark) => {
    handleCopy(bookmark.message.text).then(() =>
      notify({ variant: 'success', title: 'Success', text: 'Copied!' })
    );
  };

  return (
    <div className="scrollbar-custom h-[calc(100vh-88px)] overflow-auto">
      {!data?.length ? (
        <BookmarksEmpty />
      ) : (
        <div className="p-6">
          <BookmarksList
            bookmarks={data}
            onCopyItem={handleClickCopy}
            onDeleteItem={handleClickDelete}
          />
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
