import { Centered, Typograpghy } from '@/shared';

type NotificationsErrorProps = { errorMessage?: string };

export const NotificationsError = ({ errorMessage }: Readonly<NotificationsErrorProps>) => (
  <Centered>
    <Typograpghy>{errorMessage || 'Error'}</Typograpghy>
  </Centered>
);
