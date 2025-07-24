import { Message } from '@/entities/message';
import { Button, cn, Menu, useToogleMenu } from '@/shared';

import {
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMore,
  AiOutlinePushpin,
} from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { TiArrowBackOutline, TiArrowForwardOutline } from 'react-icons/ti';

// to Widget "ChatMessages"
type MessageMenuProps = {
  message: Message;
  participantMessage: boolean;
  topSlot?: React.ReactNode;
  onReply?: () => void;
  onForward?: () => void;
  onPin?: () => void;
  onCopy?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddBookmark?: () => void;
  onAddReaction?: (emoji: string) => void;
};

export const MessageMenu = ({
  participantMessage,
  topSlot,
  onReply,
  onForward,
  onPin,
  onCopy,
  onEdit,
  onDelete,
  onAddBookmark,
}: Readonly<MessageMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();

  return (
    <div className="relative">
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggle}>
            <AiOutlineMore size={24} />
          </Button>
        }
        topSlot={topSlot}
        content={
          <ul>
            {onReply && (
              <li>
                <Button variant="menu" onClick={onReply}>
                  <TiArrowBackOutline size={20} /> Reply
                </Button>
              </li>
            )}
            {onCopy && (
              <li>
                <Button variant="menu" onClick={onCopy}>
                  <AiOutlineCopy size={20} /> Copy
                </Button>
              </li>
            )}
            {onForward && (
              <li>
                <Button variant="menu" onClick={onForward}>
                  <TiArrowForwardOutline size={20} /> Forward
                </Button>
              </li>
            )}
            {onPin && (
              <li>
                <Button variant="menu" onClick={onPin}>
                  <AiOutlinePushpin size={20} /> Pin
                </Button>
              </li>
            )}
            {onAddBookmark && (
              <li>
                <Button variant="menu" onClick={onAddBookmark}>
                  <FiBookmark size={20} /> Bookmark
                </Button>
              </li>
            )}
            {onEdit && (
              <li>
                <Button variant="menu" onClick={onEdit}>
                  <AiOutlineEdit size={20} /> Edit
                </Button>
              </li>
            )}
            {onDelete && (
              <li>
                <Button variant="menu-danger" onClick={onDelete}>
                  <AiOutlineDelete size={20} /> Delete
                </Button>
              </li>
            )}
          </ul>
        }
        open={open}
        ref={ref}
        className={cn({ 'right-0': !participantMessage, 'left-0': participantMessage })}
      />
    </div>
  );
};
