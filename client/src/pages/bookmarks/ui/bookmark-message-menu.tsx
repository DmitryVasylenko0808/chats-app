import { Button, cn, Menu, useToogleMenu } from '@/shared';

import { AiOutlineCopy, AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';

type BookmarkMessageMenuProps = {
  isParticipant: boolean;
  onCopy?: () => void;
  onDelete?: () => void;
};
export const BookmarkMessageMenu = ({
  isParticipant,
  onCopy,
  onDelete,
}: Readonly<BookmarkMessageMenuProps>) => {
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
        className={cn({ 'right-0': !isParticipant, 'left-0': isParticipant })}
      />
    </div>
  );
};
