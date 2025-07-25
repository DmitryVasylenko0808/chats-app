import { Notification, useGetNotifications } from '@/entities/notification';
import {
  NotificationsFilters,
  NotificationTabValue,
  NotificationTypeTabs,
  useNotificationsFilter,
} from '@/features/notification/filter-notifications';
import { useMarkNotification } from '@/features/notification/mark-notification';
import { cn, Loader, Pagination, Typograpghy, usePagination } from '@/shared';

import { useNavigate } from 'react-router';

import { NotificationsList } from './notifications-list';

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

  return (
    <div>
      <div className="my-2 flex justify-end gap-4 px-4">
        <NotificationsFilters
          activeReadOption={readOption}
          activeSortOption={sortOption}
          onChangeReadOption={handleChangeReadOption}
          onChangeSortOption={handleChangeSortOption}
        />
      </div>
      <NotificationTypeTabs activeValue={entityType} onClickTab={handleClickTab} />
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
