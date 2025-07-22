import { Bookmark, useGetBookmarks } from '@/entities/bookmark';
import { Loader, Typograpghy, useAlerts, useCopy } from '@/shared';

import { useEffect, useRef } from 'react';

import { useDeleteBookmark } from '../hooks';
import { BookmarksHeader } from './bookmarks-header';
import { BookmarksList } from './bookmarks-list';

// Widget
export const Bookmarks = () => {
  const { data, isLoading, error } = useGetBookmarks();
  const { mutateAsync: deleteBookmarkMutate } = useDeleteBookmark();
  const { handleCopy } = useCopy();
  const { notify } = useAlerts();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

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
    <div className="h-screen">
      <BookmarksHeader />
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader size="lg" variant="primary" />
        </div>
      ) : error ? (
        <div className="flex h-full items-center justify-center">
          <Typograpghy>Error</Typograpghy>
        </div>
      ) : !data?.length ? (
        <div className="flex h-full items-center justify-center">
          <Typograpghy>No bookmarks</Typograpghy>
        </div>
      ) : (
        <div className="scrollbar-custom h-[calc(100vh-88px)] overflow-auto p-6">
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
