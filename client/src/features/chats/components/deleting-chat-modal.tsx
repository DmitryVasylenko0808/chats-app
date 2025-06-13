import { useAlerts } from '@/shared/hooks';
import { Button, Loader, Modal, ModalProps, Typograpghy } from '@/shared/ui';

import { useNavigate } from 'react-router';

import { useDeleteChat } from '../hooks';

type DeletingChatModalProps = { chatId: number } & ModalProps;

export const DeletingChatModal = ({ chatId, ...modalProps }: DeletingChatModalProps) => {
  const { mutateAsync, isPending } = useDeleteChat();
  const { notify } = useAlerts();
  const navigate = useNavigate();

  const handleClickDeleteChat = () =>
    mutateAsync(chatId)
      .then(() => {
        navigate('/');
        notify({ variant: 'success', title: 'Success', text: 'Chat is deleted' });
      })
      .catch((err) => notify({ variant: 'error', title: 'Error', text: err.message }));

  return (
    <Modal className="w-lg" {...modalProps}>
      <Typograpghy tagVariant="h2" className="mb-6">
        Deleting Chat
      </Typograpghy>
      <Typograpghy tagVariant="p" className="mb-10">
        Are you sure you want to delete this chat? This action cannot be undone. The entire chat and
        message history will be permanently deleted.
      </Typograpghy>
      <div className="flex justify-end">
        <Button variant="danger" onClick={handleClickDeleteChat}>
          {isPending ? <Loader variant="secondary" size="sm" /> : 'Delete Chat'}
        </Button>
      </div>
    </Modal>
  );
};
