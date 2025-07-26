import { Bookmark } from '@/entities/bookmark';
import { useDeleteBookmark } from '@/features/bookmark/delete-bookmark';
import { Button, cn, Menu, useAlerts, useCopy, useToogleMenu } from '@/shared';

import { AiOutlineCopy, AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';

type BookmarkActionsMenuProps = {
  bookmark: Bookmark;
  isParticipant: boolean;
};

export const BookmarkActionsMenu = ({
  bookmark,
  isParticipant,
}: Readonly<BookmarkActionsMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();
  const { notify } = useAlerts();
  const { handleCopy } = useCopy();
  const { mutateAsync: deleteBookmarkMutate } = useDeleteBookmark();

  const handleClickCopy = () => {
    handleCopy(bookmark.message.text).then(() =>
      notify({ variant: 'success', title: 'Success', text: 'Copied!' })
    );
  };

  const handleClickDelete = () => {
    deleteBookmarkMutate({ id: bookmark.id }).catch((err) =>
      notify({ variant: 'error', title: 'Error', text: err.message })
    );
  };

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
            <li>
              <Button variant="menu" onClick={handleClickCopy}>
                <AiOutlineCopy size={20} /> Copy
              </Button>
            </li>
            <li>
              <Button variant="menu-danger" onClick={handleClickDelete}>
                <AiOutlineDelete size={20} /> Delete
              </Button>
            </li>
          </ul>
        }
        open={open}
        ref={ref}
        className={cn({ 'right-0': !isParticipant, 'left-0': isParticipant })}
      />
    </div>
  );
};
