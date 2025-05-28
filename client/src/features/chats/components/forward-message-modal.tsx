import { useAuth } from '@/features/auth/hooks';
import { Modal, ModalProps } from '@/shared/ui';

import { useGetChats } from '../hooks';
import { Message } from '../types';

type ForwardMessageModalProps = ModalProps & {
  message: Message;
  onForward: (message: Message, targetChatId: number) => void;
};

export const ForwardMessageModal = ({
  message,
  onForward,
  ...modalProps
}: Readonly<ForwardMessageModalProps>) => {
  const { currentUser } = useAuth();
  const { data } = useGetChats();

  const handleClick = (targetChatId: number) => onForward(message, targetChatId);

  return (
    <Modal {...modalProps}>
      <h2 className="mb-6 text-xl font-semibold">Forwarding Message</h2>
      <ul className="flex h-[240px] flex-col overflow-auto">
        {data?.map((chat) => (
          <li
            className="hover:bg-active-chat flex items-center gap-3 rounded-2xl p-2.5 duration-100 hover:cursor-pointer"
            key={chat.id}
            onClick={() => handleClick(chat.id)}
          >
            <img
              src={chat.members.find((m) => m.id !== currentUser?.id)?.avatar}
              alt="user-avatar"
              className="h-10 w-10 rounded-full"
            />
            <p className="truncate font-medium">
              {chat.members.find((m) => m.id !== currentUser?.id)?.name || 'Deleted Account'}
            </p>
          </li>
        ))}
      </ul>
    </Modal>
  );
};
