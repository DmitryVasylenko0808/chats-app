import { Modal } from '@/shared';
import { Settings } from '@/widgets/settings';

import { useNavigate } from 'react-router';

const SettingsModalPage = () => {
  const navigate = useNavigate();

  const handleClickClose = () => navigate(-1);

  return (
    <Modal open onClose={handleClickClose}>
      <Settings />
    </Modal>
  );
};

export default SettingsModalPage;
