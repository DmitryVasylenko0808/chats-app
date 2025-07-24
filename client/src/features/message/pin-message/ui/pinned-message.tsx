import { Message } from '@/entities/message';
import { Button, Typograpghy, useAlerts } from '@/shared';

import { AiOutlineClose } from 'react-icons/ai';

import { useUnpinMessage } from '../lib/hooks/use-unpin-message';

type PinnedMessageProps = { pinnedMessage?: Message };

export const PinnedMessage = ({ pinnedMessage }: Readonly<PinnedMessageProps>) => {
  if (!pinnedMessage) {
    return null;
  }

  const { mutateAsync: unpinMessage } = useUnpinMessage();
  const { notify } = useAlerts();

  const handleClickUnpin = () => {
    unpinMessage({ chatId: pinnedMessage.chatId, messageId: pinnedMessage.id })
      .then(() => notify({ variant: 'success', text: 'Successfully unpinned!' }))
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  return (
    <div className="border-b-secondary-300 bg-secondary-100 dark:bg-dark-400 dark:border-b-dark-100 sticky top-0 left-0 z-20 flex max-h-16 items-center border-b px-6 py-2.5">
      <div className="flex-1">
        <Typograpghy tagVariant="h5" className="font-medium">
          Pinned Message:
        </Typograpghy>
        <Typograpghy className="w-full max-w-[1350px] truncate">{pinnedMessage.text}</Typograpghy>
      </div>
      <Button variant="text" onClick={handleClickUnpin}>
        <AiOutlineClose size={24} />
      </Button>
    </div>
  );
};
