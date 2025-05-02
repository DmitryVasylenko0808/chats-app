import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

type LoaderProps = ComponentProps<'span'>;

export const Loader = ({ className }: Readonly<LoaderProps>) => {
  return (
    <span
      className={cn(
        'h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent',
        className
      )}
    />
  );
};
