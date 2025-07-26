import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { BookmarksContent } from './bookmarks-content';
import { BookmarksError } from './bookmarks-error';
import { BookmarksLoading } from './bookmarks-loading';

export const Bookmarks = () => {
  return (
    <ErrorBoundary fallback={<BookmarksError />}>
      <Suspense fallback={<BookmarksLoading />}>
        <BookmarksContent />
      </Suspense>
    </ErrorBoundary>
  );
};
