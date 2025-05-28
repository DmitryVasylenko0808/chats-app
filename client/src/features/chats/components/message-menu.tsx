import { useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { cn } from '@/utils/cn';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';

type MessageMenuProps = {
  participantMessage: boolean;
  onEdit?: () => void;
  onReply?: () => void;
  onForward?: () => void;
  onDelete?: () => void;
};

export const MessageMenu = ({
  participantMessage,
  onEdit,
  onReply,
  onForward,
  onDelete,
}: Readonly<MessageMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();

  const canEdit = !participantMessage && onEdit;
  const canDelete = !participantMessage && onDelete;

  return (
    <Menu
      trigger={
        <Button variant="text" onClick={handleToggle}>
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      }
      content={
        <ul>
          {canEdit && (
            <li>
              <Button variant="menu" onClick={onEdit}>
                <PencilIcon width={20} height={20} /> Edit
              </Button>
            </li>
          )}
          <li>
            <Button variant="menu" onClick={onReply}>
              <ArrowUturnLeftIcon width={20} height={20} /> Reply
            </Button>
          </li>
          <li>
            <Button variant="menu" onClick={onForward}>
              <ArrowUturnRightIcon width={20} height={20} /> Forward
            </Button>
          </li>
          {canDelete && (
            <li>
              <Button variant="menu-danger" onClick={onDelete}>
                <TrashIcon width={20} height={20} /> Delete
              </Button>
            </li>
          )}
        </ul>
      }
      open={open}
      ref={ref}
      className={cn({ 'right-0': participantMessage, 'left-0': !participantMessage })}
    />
  );
};
