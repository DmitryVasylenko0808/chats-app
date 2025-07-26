import { DeletingChatModal } from '@/features/chat/delete-chat';
import { Button, Menu, useModal, useToogleMenu } from '@/shared';

import { AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';

type ChatActionsMenuProps = { chatId: number };

export const ChatActionsMenu = ({ chatId }: Readonly<ChatActionsMenuProps>) => {
  const { handleToggle, open, ref } = useToogleMenu();
  const deleteChatModal = useModal();

  return (
    <>
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggle}>
            <AiOutlineMore size={24} />
          </Button>
        }
        content={
          <ul>
            <li>
              <Button variant="menu-danger" onClick={deleteChatModal.handleClickOpen}>
                <AiOutlineDelete size={18} />
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
