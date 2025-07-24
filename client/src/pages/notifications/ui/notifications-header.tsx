import { useDeleteAllNotifications } from '@/features/notification/delete-notification';
import { Button, Menu, Typograpghy, useToogleMenu } from '@/shared';

import { AiOutlineArrowLeft, AiOutlineBell, AiOutlineDelete, AiOutlineMore } from 'react-icons/ai';
import { useNavigate } from 'react-router';

export const NotificationsHeader = () => {
  const navigate = useNavigate();
  const { open, ref, handleToggle } = useToogleMenu();
  const { mutateAsync: deleteNotifications } = useDeleteAllNotifications();

  const handleClickBack = () => navigate(-1);

  const handleDeleteAllNotifications = () => {
    deleteNotifications();
  };

  return (
    <div className="border-b-secondary-300 dark:border-b-dark-100 flex h-22 items-center border-b px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="text" onClick={handleClickBack}>
            <AiOutlineArrowLeft size={24} />
          </Button>
          <div className="flex items-center gap-4">
            <AiOutlineBell size={28} className="dark:text-secondary-100" />
            <Typograpghy tagVariant="h3">Notifications</Typograpghy>
          </div>
        </div>
        <Menu
          trigger={
            <Button variant="text" onClick={handleToggle}>
              <AiOutlineMore size={24} />
            </Button>
          }
          content={
            <>
              <Button variant="menu-danger" onClick={handleDeleteAllNotifications}>
                <AiOutlineDelete size={18} /> Delete All
              </Button>
            </>
          }
          open={open}
          ref={ref}
        />
      </div>
    </div>
  );
};
