import { useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { AiOutlineCopy, AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';

type BookmarkMenuProps = { isOwnMessage: boolean; onCopy?: () => void; onDelete?: () => void };

export const BookmarkMenu = ({ isOwnMessage, onCopy, onDelete }: Readonly<BookmarkMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();

  return (
    <div className="relative">
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggle}>
            <AiOutlineMore size={24} />
          </Button>
        }
        content={
          <ul>
            {onCopy && (
              <li>
                <Button variant="menu" onClick={onCopy}>
                  <AiOutlineCopy size={20} /> Copy
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
        className={cn({ 'right-0': isOwnMessage, 'left-0': !isOwnMessage })}
      />
    </div>
  );
};
