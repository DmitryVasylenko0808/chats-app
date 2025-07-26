import { Loader } from '@/shared';
import { Centered } from '@/shared/ui/centered';

export const UserProfileLoading = () => (
  <Centered>
    <Loader variant="primary" size="lg" />
  </Centered>
);
