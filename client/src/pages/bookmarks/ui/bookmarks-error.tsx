import { Centered, Typograpghy } from '@/shared';

type BookmarksErrorProps = { errorMessage?: string };

export const BookmarksError = ({ errorMessage }: Readonly<BookmarksErrorProps>) => (
  <Centered>
    <Typograpghy>{errorMessage || 'Error'}</Typograpghy>
  </Centered>
);
