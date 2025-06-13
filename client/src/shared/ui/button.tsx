import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'menu' | 'text' | 'danger' | 'menu-danger';
  fullWidth?: true;
};

export const Button = ({
  variant = 'primary',
  fullWidth,
  className,
  children,
  ...btnProps
}: Readonly<ButtonProps>) => {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center duration-100',
        {
          'bg-primary-200 disabled:bg-primary-300 hover:bg-primary-300 h-10 min-w-32 rounded-full px-16 font-semibold text-white':
            variant === 'primary',
          'border-primary-200 text-primary-200 h-10 rounded-full border px-16 font-semibold duration-100':
            variant === 'secondary',
          'text-body hover:bg-item-menu-hover w-full justify-start gap-2.5 px-3 py-1.5':
            variant === 'menu',
          'text-body': variant === 'text',
          'bg-red disabled:bg-red-hovered hover:bg-red-hovered h-10 min-w-32 rounded-full px-16 font-semibold text-white':
            variant === 'danger',
          'text-red hover:bg-item-menu-hover w-full justify-start gap-2.5 px-3 py-1.5':
            variant === 'menu-danger',
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
