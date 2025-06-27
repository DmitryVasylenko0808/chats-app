import { Notification } from '@/entities';
import { Option, TabItem, Tabs } from '@/shared/ui';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  useDeleteAllNotifications,
  useDeleteNotificationById,
  useGetNotifications,
  useMarkNotification,
} from '../hooks';
import { NotificationTabValue, ReadOptionValue, SortDateOptionValue } from '../types';
import { NotificationsFilters } from './notifications-filters';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

const tabs: TabItem<NotificationTabValue>[] = [
  { value: undefined, title: 'All' },
  { value: 'CHAT', title: 'Chats' },
  { value: 'MESSAGE', title: 'Messages' },
];

const readOptions: Option<ReadOptionValue>[] = [
  { value: -1, label: 'All' },
  { value: 0, label: 'Unread' },
  { value: 1, label: 'Read' },
];

const sortOptins: Option<SortDateOptionValue>[] = [
  { value: 'asc', label: 'Oldest' },
  { value: 'desc', label: 'Newest' },
];

export const Notifications = () => {
  const [activeEntityType, setActiveEntityType] = useState<NotificationTabValue>();
  const [activeReadOption, setActiveReadOption] = useState<number>(-1);
  const [activeSortOption, setActiveSortOption] = useState<SortDateOptionValue>('desc');
  const { data: notifications } = useGetNotifications({
    page: 1,
    limit: 10,
    sortDate: activeSortOption,
    isRead: activeReadOption === -1 ? undefined : !!activeReadOption,
    entityType: activeEntityType,
  });
  const { mutateAsync: markNotification } = useMarkNotification();
  const { mutateAsync: deleteNotifications } = useDeleteAllNotifications();
  const { mutateAsync: deleteNotification } = useDeleteNotificationById();
  const navigate = useNavigate();

  const handleClickNotification = (notification: Notification, entityPath?: string) => {
    if (entityPath) {
      navigate(entityPath);
      markNotification(notification.id);
    }
  };

  const handleDeleteAllNotifications = () => {
    deleteNotifications();
  };

  const handleDeleteNotification = (notification: Notification) => {
    deleteNotification(notification.id);
  };

  const handleClickTab = (entityType: NotificationTabValue) => setActiveEntityType(entityType);
  const handleChangeReadOption = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setActiveReadOption(Number(e.target.value));
  const handleChangeSortOption = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setActiveSortOption(e.target.value as SortDateOptionValue);

  return (
    <div>
      <NotificationsHeader onDeleteAll={handleDeleteAllNotifications} />
      <NotificationsFilters
        readOptions={readOptions}
        activeReadOption={activeReadOption}
        sortOptions={sortOptins}
        activeSortOption={activeSortOption}
        onChangeReadOption={handleChangeReadOption}
        onChangeSortOption={handleChangeSortOption}
      />
      <Tabs tabs={tabs} activeValue={activeEntityType} onClickTab={handleClickTab} />
      <div className="scrollbar-custom h-[calc(100vh-88px-40px-54px)] overflow-auto">
        <NotificationsList
          notifications={notifications?.data}
          onClickItem={handleClickNotification}
          onDeleteItem={handleDeleteNotification}
        />
      </div>
    </div>
  );
};
