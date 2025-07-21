import { RefObject, useEffect } from 'react';

export const useClickOutside = <E extends HTMLElement = HTMLElement>(
  ref: RefObject<E | null>,
  cb: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, cb]);
};
