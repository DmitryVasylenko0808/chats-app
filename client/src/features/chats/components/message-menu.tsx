import { useModal, useToogleMenu } from '@/shared/hooks';
import { Button, Menu } from '@/shared/ui';
import { cn } from '@/utils/cn';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

import { useDeleteMessage } from '../hooks';
import { MessageWithSender } from '../types';
import { EditMessageModal } from './edit-message-modal';

type MessageMenuProps = { message: MessageWithSender; participantMessage: boolean };

export const MessageMenu = ({ message, participantMessage }: Readonly<MessageMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();
  const editModal = useModal();
  const { mutateAsync: deleteMessage } = useDeleteMessage();

  const handleClickEdit = editModal.handleClickOpen;
  const handleDeleteMessage = () =>
    deleteMessage({ chatId: message.chatId, messageId: message.id }).catch((err) =>
      alert(err.message)
    );

  return (
    <>
      <Menu
        trigger={
          <Button variant="text" onClick={handleToggle}>
            <EllipsisVerticalIcon width={18} height={18} />
          </Button>
        }
        content={
          <ul>
            <li>
              <Button variant="menu" onClick={handleClickEdit}>
                <PencilIcon width={20} height={20} /> Edit
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={handleDeleteMessage}>
                <TrashIcon width={20} height={20} /> Delete
              </Button>
            </li>
          </ul>
        }
        open={open}
        ref={ref}
        className={cn({ 'right-0': participantMessage, 'left-0': !participantMessage })}
      />
      <EditMessageModal
        open={editModal.open}
        onClose={editModal.handleClickClose}
        message={message}
      />
    </>
  );
};
