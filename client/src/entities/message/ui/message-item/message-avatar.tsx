import { Message } from '@/entities/message';

import { Link, useLocation } from 'react-router';

type MessageAvatarProps = { sender: Message['sender'] };

export const MessageAvatar = ({ sender }: Readonly<MessageAvatarProps>) => {
  const location = useLocation();

  return (
    <div className="mx-2 min-w-10">
      <Link to={`/profile/${sender?.id}`} state={{ backgroundLocation: location }}>
        <img src={sender?.avatar} alt="sender-avatar" className="h-10 w-10 rounded-full" />
      </Link>
    </div>
  );
};
