import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

type LoaderProps = ComponentProps<'span'> & { variant: 'primary' | 'secondary'; size: 'sm' | 'lg' };

export const Loader = ({ variant, size, className }: Readonly<LoaderProps>) => {
  return (
    <span
      className={cn(
        'animate-spin rounded-full border-2',
        {
          'border-white': variant === 'secondary',
          'border-primary': variant === 'primary',
          'h-5 w-5': size === 'sm',
          'h-8 w-8': size === 'lg',
        },
        className,
        'border-r-transparent'
      )}
    />
  );
};
