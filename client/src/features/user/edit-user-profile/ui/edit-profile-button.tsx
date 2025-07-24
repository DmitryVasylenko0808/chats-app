import { Button, useModal } from '@/shared';

import { ComponentProps } from 'react';

import { EditingUserProfileModal } from './editing-user-profile-modal';

type EditProfileButtonProps = ComponentProps<'button'>;

export const EditProfileButton = ({ ...btnProps }: Readonly<EditProfileButtonProps>) => {
  const editModal = useModal();

  return (
    <>
      <Button
        variant="secondary"
        className="mt-3"
        onClick={editModal.handleClickOpen}
        fullWidth
        {...btnProps}
      >
        Edit Profile
      </Button>
      <EditingUserProfileModal open={editModal.open} onClose={editModal.handleClickClose} />
    </>
  );
};
