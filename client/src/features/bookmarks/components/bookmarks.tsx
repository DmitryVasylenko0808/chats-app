import { useAlerts, useCopy } from '@/shared/hooks';
import { Loader, Typograpghy } from '@/shared/ui';

import { useDeleteBookmark, useGetBookmarks } from '../hooks';
import { Bookmark } from '../types';
import { BookmarksHeader } from './bookmarks-header';
import { BookmarksList } from './bookmarks-list';

export const Bookmarks = () => {
  const { data, isLoading, error } = useGetBookmarks();
  const { mutateAsync: deleteBookmarkMutate } = useDeleteBookmark();
  const { handleCopy } = useCopy();
  const { notify } = useAlerts();

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
      ) : (
        <BookmarksList
          bookmarks={data}
          onCopyItem={handleClickCopy}
          onDeleteItem={handleClickDelete}
        />
      )}
    </div>
  );
};
