import { Button, Menu, useModal, useToogleMenu } from '@/shared';

import { AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';

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
