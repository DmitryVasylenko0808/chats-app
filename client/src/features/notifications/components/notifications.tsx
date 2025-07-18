import { Notification } from '@/entities';
import { usePagination } from '@/shared/hooks';
import { Loader, Option, Pagination, TabItem, Tabs, Typograpghy } from '@/shared/ui';
import { cn } from '@/utils/cn';

import { useNavigate } from 'react-router';

import {
  useDeleteAllNotifications,
  useDeleteNotificationById,
  useGetNotifications,
  useMarkNotification,
  useNotificationsFilter,
} from '../hooks';
import { NotificationTabValue } from '../types';
import { NotificationsFilters } from './notifications-filters';
import { NotificationsHeader } from './notifications-header';
import { NotificationsList } from './notifications-list';

const tabs: TabItem<NotificationTabValue>[] = [
  { value: undefined, title: 'All' },
  { value: 'CHAT', title: 'Chats' },
  { value: 'MESSAGE', title: 'Messages' },
];
const readOptions: Option[] = [
  { value: '-1', label: 'All' },
  { value: '0', label: 'Unread' },
  { value: '1', label: 'Read' },
];
const sortOptions: Option[] = [
  { value: 'asc', label: 'Oldest' },
  { value: 'desc', label: 'Newest' },
];
const initialPage = 1;
const initialLimit = 9;

export const Notifications = () => {
  const { entityType, readOption, sortOption, setEntityType, setReadOption, setSortOption } =
    useNotificationsFilter();
  const { page, limit, onPageChange } = usePagination(initialPage, initialLimit, [
    entityType,
    readOption,
    sortOption,
  ]);
  const {
    data: notifications,
    isFetching,
    isPending,
    error,
  } = useGetNotifications({
    sortDate: sortOption,
    isRead: readOption === '-1' ? undefined : Boolean(Number(readOption)),
    entityType,
    page,
    limit,
  });
  const { mutateAsync: markNotification } = useMarkNotification();
  const { mutateAsync: deleteNotifications } = useDeleteAllNotifications();
  const { mutateAsync: deleteNotification } = useDeleteNotificationById();
  const navigate = useNavigate();

  const handleClickTab = (entityType: NotificationTabValue) => setEntityType(entityType);
  const handleChangeReadOption = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setReadOption(e.target.value);
  const handleChangeSortOption = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortOption(e.target.value);

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

  return (
    <div>
      <NotificationsHeader onDeleteAll={handleDeleteAllNotifications} />
      <NotificationsFilters
        readOptions={readOptions}
        activeReadOption={readOption}
        sortOptions={sortOptions}
        activeSortOption={sortOption}
        onChangeReadOption={handleChangeReadOption}
        onChangeSortOption={handleChangeSortOption}
      />
      <Tabs tabs={tabs} activeValue={entityType} onClickTab={handleClickTab} />
      <div
        className={cn('scrollbar-custom h-[calc(100vh-88px-40px-54px)] overflow-auto', {
          'h-[calc(100vh-88px-40px-54px-72px)]': notifications?.totalPages !== 1,
          'opacity-50': isFetching && !isPending,
        })}
      >
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Loader size="lg" variant="primary" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <Typograpghy>Error</Typograpghy>
          </div>
        ) : !notifications?.data?.length ? (
          <div className="flex h-full items-center justify-center">
            <Typograpghy>No notifications</Typograpghy>
          </div>
        ) : (
          <NotificationsList
            notifications={notifications?.data}
            onClickItem={handleClickNotification}
            onDeleteItem={handleDeleteNotification}
          />
        )}
      </div>
      <Pagination
        totalPages={notifications?.totalPages}
        currentPage={notifications?.currentPage}
        className="flex px-6 py-4"
        onPageChange={onPageChange}
      />
    </div>
  );
};
