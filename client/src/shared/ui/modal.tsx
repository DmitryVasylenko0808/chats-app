import { cn } from '@/shared/lib/utils/cn';

import { ComponentProps } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from './button';
import Portal from './portal';

export type ModalProps = ComponentProps<'div'> & {
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ open, className, children, onClose }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <Portal targetId="portals-root">
      <div className="fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center bg-black/50">
        <div
          className={cn(
            'bg-secondary-100 dark:bg-dark-300 max-h-[800px] min-w-sm overflow-auto rounded-2xl shadow-2xl',
            className
          )}
        >
          <div className="p-6">
            <div className="mb-6 flex justify-end">
              <Button variant="text" onClick={onClose}>
                <AiOutlineClose size={24} />
              </Button>
            </div>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
