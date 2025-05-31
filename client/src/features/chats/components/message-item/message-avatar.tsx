type MessageAvatarProps = { src?: string };

export const MessageAvatar = ({ src }: Readonly<MessageAvatarProps>) => (
  <div className="mx-3 w-10">
    <img src={src} alt="sender-avatar" className="h-10 w-10 rounded-full" />
  </div>
);
