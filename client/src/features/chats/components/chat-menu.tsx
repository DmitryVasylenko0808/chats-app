import { useModal, useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/16/solid';

import { DeletingChatModal } from './deleting-chat-modal';

type ChatMenuProps = { chatId: number };

export const ChatMenu = ({ chatId }: Readonly<ChatMenuProps>) => {
  const { handleToggle, open, ref } = useToogleMenu();
  const deleteChatModal = useModal();

  return (
    <>
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggle}>
            <EllipsisVerticalIcon width={24} height={24} />
          </Button>
        }
        content={
          <ul>
            <li>
              <Button variant="menu-danger" onClick={deleteChatModal.handleClickOpen}>
                <TrashIcon width={18} height={18} />
                Delete
              </Button>
            </li>
          </ul>
        }
        open={open}
        ref={ref}
      />
      <DeletingChatModal
        open={deleteChatModal.open}
        onClose={deleteChatModal.handleClickClose}
        chatId={chatId}
      />
    </>
  );
};
