import { useToogleMenu } from '@/shared/hooks';
import { Button, Menu, ReactionPicker } from '@/shared/ui';
import { cn } from '@/utils/cn';

import {
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMore,
  AiOutlinePushpin,
} from 'react-icons/ai';
import { TiArrowBackOutline, TiArrowForwardOutline } from 'react-icons/ti';

type MessageMenuProps = {
  participantMessage: boolean;
  onReply?: () => void;
  onForward?: () => void;
  onPin?: () => void;
  onCopy?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddReaction?: (emoji: string) => void;
};

export const MessageMenu = ({
  participantMessage,
  onReply,
  onForward,
  onPin,
  onCopy,
  onEdit,
  onDelete,
  onAddReaction,
}: Readonly<MessageMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();

  const handleClickReactionPicker = (reaction: string) => onAddReaction?.(reaction);

  const canEdit = !participantMessage && onEdit;
  const canDelete = !participantMessage && onDelete;

  return (
    <div className="relative">
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggle}>
            <AiOutlineMore size={24} />
          </Button>
        }
        header={<ReactionPicker onClickReaction={handleClickReactionPicker} className="mb-1" />}
        content={
          <ul>
            <li>
              <Button variant="menu" onClick={onReply}>
                <TiArrowBackOutline size={20} /> Reply
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={onCopy}>
                <AiOutlineCopy size={20} /> Copy
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={onForward}>
                <TiArrowForwardOutline size={20} /> Forward
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={onPin}>
                <AiOutlinePushpin size={20} /> Pin
              </Button>
            </li>
            {canEdit && (
              <li>
                <Button variant="menu" onClick={onEdit}>
                  <AiOutlineEdit size={20} /> Edit
                </Button>
              </li>
            )}
            {canDelete && (
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
