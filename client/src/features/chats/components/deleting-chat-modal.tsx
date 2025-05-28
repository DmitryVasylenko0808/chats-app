import { Button, Loader, Modal, ModalProps } from '@/shared/ui';

import { useDeleteChat } from '../hooks';

type DeletingChatModalProps = { chatId: number } & ModalProps;

export const DeletingChatModal = ({ chatId, ...modalProps }: DeletingChatModalProps) => {
  const { mutateAsync, isPending } = useDeleteChat();

  const handleClickDeleteChat = () =>
    mutateAsync(chatId)
      .then(() => alert('Chat is deleted'))
      .catch((err) => alert(err.message));

  return (
    <Modal {...modalProps}>
      <h2 className="mb-6 text-xl font-semibold">Deleting Chat</h2>
      <p className="text-body mb-10">
        Are you sure you want to delete this chat? This action cannot be undone. The entire chat and
        message history will be permanently deleted.
      </p>
      <div className="flex justify-end">
        <Button variant="danger" onClick={handleClickDeleteChat}>
          {isPending ? <Loader variant="secondary" size="sm" /> : 'Delete Chat'}
        </Button>
      </div>
    </Modal>
  );
};
