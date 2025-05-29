import { Button } from '@/shared/ui';
import { XMarkIcon } from '@heroicons/react/16/solid';

import { Message } from '../types';

type PinnedMessageProps = { pinnedMessage?: Message; onUnpin: (message: Message) => void };

export const PinnedMessage = ({ pinnedMessage, onUnpin }: Readonly<PinnedMessageProps>) => {
  if (!pinnedMessage) {
    return null;
  }

  const handleClickUnpin = () => onUnpin(pinnedMessage);

  return (
    <div className="border-b-body/10 sticky top-0 left-0 z-10 flex max-h-16 items-center border-b-2 bg-white px-6 py-2.5">
      <div className="flex-1">
        <h5 className="font-semibold">Pinned Message:</h5>
        <p className="text-body w-full max-w-[1350px] truncate">{pinnedMessage.text}</p>
      </div>
      <Button variant="text" onClick={handleClickUnpin}>
        <XMarkIcon width={24} height={24} />
      </Button>
    </div>
  );
};
