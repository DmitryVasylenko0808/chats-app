import { useClickOutside } from '@/shared/hooks';
import { Button, EmojiPicker } from '@/shared/ui';

import { useRef, useState } from 'react';
import { AiOutlineSmile } from 'react-icons/ai';

type ChatEmojiPickerProps = { onClickEmoji: (emoji: string) => void };

export const ChatEmojiPicker = ({ onClickEmoji }: Readonly<ChatEmojiPickerProps>) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setShowEmojiPicker(false));

  const handleClickTogglePicker = () => setShowEmojiPicker((prev) => !prev);

  return (
    <div className="relative h-6 w-6">
      <Button
        type="button"
        variant="text"
        className="text-primary-200 dark:text-primary-200"
        onClick={handleClickTogglePicker}
      >
        <AiOutlineSmile size={24} />
      </Button>
      <div className="absolute -top-[450px] -left-[380px]" ref={ref}>
        {showEmojiPicker && <EmojiPicker onClickEmoji={onClickEmoji} />}
      </div>
    </div>
  );
};
