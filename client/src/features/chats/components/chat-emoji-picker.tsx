import { useClickOutside } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import EmojiPicker, { PickerProps } from 'emoji-picker-react';

import { useRef, useState } from 'react';
import { AiOutlineSmile } from 'react-icons/ai';

type ChatEmojiPickerProps = PickerProps;

export const ChatEmojiPicker = (props: Readonly<ChatEmojiPickerProps>) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setShowEmojiPicker(false));

  const handleClickTogglePicker = () => setShowEmojiPicker((prev) => !prev);

  return (
    <div className="relative h-6 w-6">
      <Button
        type="button"
        variant="text"
        className="text-primary"
        onClick={handleClickTogglePicker}
      >
        <AiOutlineSmile size={24} />
      </Button>
      <div className="absolute -top-[500px] -left-[380px]" ref={ref}>
        {showEmojiPicker && <EmojiPicker {...props} />}
      </div>
    </div>
  );
};
