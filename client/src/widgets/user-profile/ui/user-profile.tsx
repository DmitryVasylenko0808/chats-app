import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { UserProfileContent } from './user-profile-content';
import { UserProfileError } from './user-profile-error';
import { UserProfileLoading } from './user-profile-loading';

export const UserProfile = () => {
  return (
    <ErrorBoundary fallback={<UserProfileError />}>
      <Suspense fallback={<UserProfileLoading />}>
        <UserProfileContent />
      </Suspense>
    </ErrorBoundary>
  );
};
