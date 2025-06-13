import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from './button';
import Portal from './portal';

export type DrawerProps = ComponentProps<'div'> & {
  open: boolean;
  onClose: () => void;
};

export const Drawer = ({ open, className, children, onClose }: Readonly<DrawerProps>) => {
  if (!open) {
    return null;
  }

  return (
    <Portal targetId="modals-root">
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full bg-black/50">
        <div className={cn('bg-secondary-100 h-screen w-xs overflow-auto shadow-2xl', className)}>
          <div className="my-6 flex justify-end px-6">
            <Button variant="text" onClick={onClose}>
              <AiOutlineClose size={24} />
            </Button>
          </div>
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
