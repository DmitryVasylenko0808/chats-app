import { AiFillMessage } from 'react-icons/ai';

type LogoProps = { size?: number | string };

export const Logo = ({ size = 46 }: Readonly<LogoProps>) => {
  return <AiFillMessage className="text-primary-200 inline" size={size} />;
};
