import { cn } from '@/utils/cn';

import { RefObject } from 'react';

type MenuProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  ref: RefObject<HTMLDivElement | null>;
  contentContainerPosition?: 'bottom' | 'top';
};

export const Menu = ({
  trigger,
  content,
  open,
  ref,
  contentContainerPosition = 'bottom',
}: Readonly<MenuProps>) => {
  return (
    <div className="relative">
      {trigger}
      {open && (
        <div
          className={cn('w-max min-w-32', {
            'border-body/30 absolute top-full right-0 z-10 m-1 rounded-xl border bg-white py-2 shadow-xl':
              contentContainerPosition === 'bottom',
            'border-body/30 absolute right-0 bottom-full z-10 m-1 rounded-xl border bg-white py-2 shadow-xl':
              contentContainerPosition === 'top',
          })}
          ref={ref}
        >
          {content}
        </div>
      )}
    </div>
  );
};
