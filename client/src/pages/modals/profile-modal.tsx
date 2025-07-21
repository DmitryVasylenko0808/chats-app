import { UserProfile } from '@/features/users/components';
import { Modal } from '@/shared';

import { useNavigate } from 'react-router';

const ProfileModal = () => {
  const navigate = useNavigate();

  const handleClickClose = () => navigate(-1);

  return (
    <Modal open onClose={handleClickClose} className="w-md">
      <UserProfile />
    </Modal>
  );
};

export default ProfileModal;
