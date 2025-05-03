import { useRef, useState } from 'react';

import { useClickOutside } from './use-click-outside';

export const useToogleMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const handleToggle = () => setOpen((open) => !open);

  return { open, ref, handleToggle };
};
