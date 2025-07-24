import { Modal } from '@/shared';
import { UserProfile } from '@/widgets';

import { useNavigate } from 'react-router';

const UserProfileModalPage = () => {
  const navigate = useNavigate();

  const handleClickClose = () => navigate(-1);

  return (
    <Modal open onClose={handleClickClose} className="w-md">
      <UserProfile />
    </Modal>
  );
};

export default UserProfileModalPage;
