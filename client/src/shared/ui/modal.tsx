import { cn } from '@/utils/cn';
import { XMarkIcon } from '@heroicons/react/16/solid';

import { ComponentProps } from 'react';

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
    <Portal targetId="modals-root">
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/50">
        <div
          className={cn(
            'max-h-[800px] w-md overflow-auto rounded-2xl bg-white shadow-2xl',
            className
          )}
        >
          <div className="p-6">
            <div className="mb-6 flex justify-end">
              <Button variant="text" onClick={onClose}>
                <XMarkIcon width={24} height={24} />
              </Button>
            </div>
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
