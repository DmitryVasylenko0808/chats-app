import { useAuth } from '@/features/auth/hooks';
import { Loader, Modal, ModalProps, Typograpghy } from '@/shared/ui';

import { useGetUser } from '../hooks';
import { EditingUserProfileForm } from './editing-user-profile-form';

type EditingProfileModalProps = ModalProps;

export const EditingUserProfileModal = (modalProps: Readonly<EditingProfileModalProps>) => {
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetUser(currentUser?.id);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader variant="primary" size="lg" />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    data && (
      <Modal className="w-md" {...modalProps}>
        <Typograpghy tagVariant="h2" className="mb-6">
          Editing Profile
        </Typograpghy>
        <EditingUserProfileForm user={data} onSubmit={modalProps.onClose} />
      </Modal>
    )
  );
};
