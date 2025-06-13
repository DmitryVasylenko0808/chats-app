import { Button } from '@/shared/ui';

import { AiOutlineClose } from 'react-icons/ai';

import { Message } from '../types';

type PinnedMessageProps = { pinnedMessage?: Message; onUnpin: (message: Message) => void };

export const PinnedMessage = ({ pinnedMessage, onUnpin }: Readonly<PinnedMessageProps>) => {
  if (!pinnedMessage) {
    return null;
  }

  const handleClickUnpin = () => onUnpin(pinnedMessage);

  return (
    <div className="border-b-body/10 bg-secondary-100 sticky top-0 left-0 z-20 flex max-h-16 items-center border-b-2 px-6 py-2.5">
      <div className="flex-1">
        <h5 className="font-semibold">Pinned Message:</h5>
        <p className="text-body w-full max-w-[1350px] truncate">{pinnedMessage.text}</p>
      </div>
      <Button variant="text" onClick={handleClickUnpin}>
        <AiOutlineClose size={24} />
      </Button>
    </div>
  );
};
