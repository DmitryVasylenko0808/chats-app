import { UserSettings } from '@/features/users/components';
import { Modal } from '@/shared/ui';

import { useNavigate } from 'react-router';

const SettingsModal = () => {
  const navigate = useNavigate();

  const handleClickClose = () => navigate(-1);

  return (
    <Modal open onClose={handleClickClose}>
      <UserSettings />
    </Modal>
  );
};

export default SettingsModal;
