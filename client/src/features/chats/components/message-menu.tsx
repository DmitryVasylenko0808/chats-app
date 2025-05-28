import { useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { cn } from '@/utils/cn';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

type MessageMenuProps = {
  participantMessage: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const MessageMenu = ({
  participantMessage,
  onEdit,
  onDelete,
}: Readonly<MessageMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();

  return (
    <Menu
      trigger={
        <Button variant="text" onClick={handleToggle}>
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      }
      content={
        <ul>
          {onEdit && (
            <li>
              <Button variant="menu" onClick={onEdit}>
                <PencilIcon width={20} height={20} /> Edit
              </Button>
            </li>
          )}
          {onDelete && (
            <li>
              <Button variant="menu" onClick={onDelete}>
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
