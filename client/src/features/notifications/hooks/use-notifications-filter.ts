import { useState } from 'react';

import { NotificationTabValue, ReadOptionValue, SortDateOptionValue } from '../types';

export const useNotificationsFilter = () => {
  const [entityType, setEntityType] = useState<NotificationTabValue>();
  const [readOption, setReadOption] = useState<ReadOptionValue>(-1);
  const [sortOption, setSortOption] = useState<SortDateOptionValue>('desc');

  return { entityType, readOption, sortOption, setEntityType, setReadOption, setSortOption };
};
