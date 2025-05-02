import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & { fullWidth?: true };

export const Button = ({ fullWidth, className, children, ...btnProps }: Readonly<ButtonProps>) => {
  return (
    <button
      className={cn(
        'bg-primary disabled:bg-primary-hovered hover:bg-primary-hovered inline-flex h-10 min-w-32 cursor-pointer items-center justify-center rounded-full px-16 text-[15px] text-white duration-100',
        {
          'w-full': fullWidth === true,
        },
        className
      )}
      {...btnProps}
    >
      {children}
    </button>
  );
};
