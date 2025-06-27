import { EntityType, Notification } from '@/entities';
import { Option, Selector, TabItem, Tabs, Typograpghy } from '@/shared/ui';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import {
  useDeleteAllNotifications,
  useDeleteNotificationById,
  useGetNotifications,
  useMarkNotification,
} from '../hooks';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

type NotificationTabValue = EntityType | undefined;
const tabs: TabItem<NotificationTabValue>[] = [
  { value: undefined, title: 'All' },
  { value: 'CHAT', title: 'Chats' },
  { value: 'MESSAGE', title: 'Messages' },
];

type ReadOptionValue = -1 | 0 | 1;
const readOptions: Option<ReadOptionValue>[] = [
  { value: -1, label: 'All' },
  { value: 0, label: 'Unread' },
  { value: 1, label: 'Read' },
];

type SortDateOptionValue = 'asc' | 'desc';
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
      <div className="my-2 flex justify-end gap-4 px-4">
        <div className="inline-flex items-center gap-2">
          <Typograpghy>Filter:</Typograpghy>
          <Selector
            options={readOptions}
            value={activeReadOption}
            onChange={handleChangeReadOption}
          />
        </div>
        <div className="inline-flex items-center gap-2">
          <Typograpghy>Sort:</Typograpghy>
          <Selector
            options={sortOptins}
            value={activeSortOption}
            onChange={handleChangeSortOption}
          />
        </div>
      </div>
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
