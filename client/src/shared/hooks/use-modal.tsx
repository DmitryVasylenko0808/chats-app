import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  return { open, handleClickOpen, handleClickClose };
};
