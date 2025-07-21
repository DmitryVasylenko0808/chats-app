import { cn } from '@/shared/lib/utils/cn';

import { RefObject } from 'react';

type MenuProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  ref: RefObject<HTMLDivElement | null>;
  contentContainerPosition?: 'bottom' | 'top';
  header?: React.ReactNode;
  className?: string;
};

export const Menu = ({
  trigger,
  content,
  open,
  ref,
  contentContainerPosition = 'bottom',
  className,
  header,
}: Readonly<MenuProps>) => {
  return (
    <div className="relative">
      {trigger}
      {open && (
        <div
          className={cn(
            'absolute z-30 m-1 w-max min-w-32',
            {
              'top-full right-0': contentContainerPosition === 'bottom',
              'right-0 bottom-full': contentContainerPosition === 'top',
            },
            className
          )}
          ref={ref}
        >
          {header}
          <div
            className={cn(
              'border-secondary-300 bg-secondary-100 dark:bg-dark-300 dark:border-dark-100 rounded-xl border py-2 shadow-xl'
            )}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
