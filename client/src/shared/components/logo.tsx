import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/16/solid';

type LogoProps = { size?: number | string };

export const Logo = ({ size = 46 }: Readonly<LogoProps>) => {
  return (
    <ChatBubbleOvalLeftEllipsisIcon className="text-primary inline" width={size} height={size} />
  );
};
