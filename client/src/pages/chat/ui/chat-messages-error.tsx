import { Centered, Typograpghy } from '@/shared';

type ChatMessagesErrorProps = { errorMessage?: string };

export const ChatMessagesError = ({ errorMessage }: Readonly<ChatMessagesErrorProps>) => (
  <Centered>
    <Typograpghy>{errorMessage || 'Error'}</Typograpghy>
  </Centered>
);
