import { isParticipant, Message } from '@/entities/message';
import { useAddBookmark } from '@/features/bookmark/add-bookmark';
import { useDeleteMessage } from '@/features/message/delete-message';
import { EditMessageModal } from '@/features/message/edit-message';
import { ForwardMessageModal } from '@/features/message/forward-message';
import { usePinMessage } from '@/features/message/pin-message';
import { ReplyMessageModal } from '@/features/message/reply-message';
import { Button, cn, Menu, useAlerts, useAuth, useCopy, useToogleMenu } from '@/shared';

import { useState } from 'react';
import {
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMore,
  AiOutlinePushpin,
} from 'react-icons/ai';
import { FiBookmark } from 'react-icons/fi';
import { TiArrowBackOutline, TiArrowForwardOutline } from 'react-icons/ti';

type MessageActionsMenuProps = {
  message: Message;
  participantMessage: boolean;
  topSlot?: React.ReactNode;
};

export const MessageActionsMenu = ({
  message,
  participantMessage,
  topSlot,
}: Readonly<MessageActionsMenuProps>) => {
  const { open, ref, handleToggle } = useToogleMenu();
  const { currentUser } = useAuth();
  const { notify } = useAlerts();
  const { mutateAsync: pinMessage } = usePinMessage();
  const { mutateAsync: deleteMessage } = useDeleteMessage();
  const { mutateAsync: addBookmark } = useAddBookmark();
  const { handleCopy } = useCopy();
  const [editableMessage, setEditableMessage] = useState<Message | null>(null);
  const [replyingMessage, setReplyingMessage] = useState<Message | null>(null);
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null);

  const handleClickReply = () => setReplyingMessage(message);
  const handleClickCloseReply = () => setReplyingMessage(null);

  const handleClickCopy = () => {
    handleCopy(message.text)
      .then(() => notify({ variant: 'success', text: 'Copied!' }))
      .catch(() => notify({ variant: 'error', title: 'Error', text: 'Cannot copy text message' }));
  };

  const handleClickForward = () => setForwardingMessage(message);
  const handleClickCloseForward = () => setForwardingMessage(null);

  const handlePinMessage = () => {
    pinMessage({ chatId: message.chatId, messageId: message.id })
      .then(() => notify({ variant: 'success', text: 'Successfully pinned!' }))
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  const handleClickBookmark = () => {
    addBookmark({ messageId: message.id })
      .then(() =>
        notify({ variant: 'success', title: 'Success', text: 'Message is added to bookmarks' })
      )
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));
  };

  const handleClickEdit = () => setEditableMessage(message);
  const handleClickCloseEdit = () => setEditableMessage(null);

  const handleDeleteMessage = () => {
    deleteMessage({ chatId: message.chatId, messageId: message.id }).catch((err) =>
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
        topSlot={topSlot}
        content={
          <ul>
            <li>
              <Button variant="menu" onClick={handleClickReply}>
                <TiArrowBackOutline size={20} /> Reply
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={handleClickCopy}>
                <AiOutlineCopy size={20} /> Copy
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={handleClickForward}>
                <TiArrowForwardOutline size={20} /> Forward
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={handlePinMessage}>
                <AiOutlinePushpin size={20} /> Pin
              </Button>
            </li>
            <li>
              <Button variant="menu" onClick={handleClickBookmark}>
                <FiBookmark size={20} /> Bookmark
              </Button>
            </li>
            {!isParticipant(currentUser?.id, message.senderId) && (
              <li>
                <Button variant="menu" onClick={handleClickEdit}>
                  <AiOutlineEdit size={20} /> Edit
                </Button>
              </li>
            )}
            {!isParticipant(currentUser?.id, message.senderId) && (
              <li>
                <Button variant="menu-danger" onClick={handleDeleteMessage}>
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
      {editableMessage && (
        <EditMessageModal
          open={!!editableMessage}
          message={editableMessage}
          onClose={handleClickCloseEdit}
        />
      )}
      {replyingMessage && (
        <ReplyMessageModal
          open={!!replyingMessage}
          message={replyingMessage}
          onClose={handleClickCloseReply}
        />
      )}
      {forwardingMessage && (
        <ForwardMessageModal
          open={!!forwardingMessage}
          message={forwardingMessage}
          onClose={handleClickCloseForward}
        />
      )}
    </div>
  );
};
