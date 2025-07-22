import { Message } from '@/entities/message';
import { Button, Typograpghy } from '@/shared';

import { AiOutlineClose } from 'react-icons/ai';

type PinnedMessageProps = { pinnedMessage?: Message; onUnpin: (message: Message) => void };

export const PinnedMessage = ({ pinnedMessage, onUnpin }: Readonly<PinnedMessageProps>) => {
  if (!pinnedMessage) {
    return null;
  }

  const handleClickUnpin = () => onUnpin(pinnedMessage);

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
