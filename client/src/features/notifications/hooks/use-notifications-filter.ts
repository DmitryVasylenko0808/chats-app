import { useState } from 'react';

import { NotificationTabValue } from '../types';

export const useNotificationsFilter = () => {
  const [entityType, setEntityType] = useState<NotificationTabValue>();
  const [readOption, setReadOption] = useState<string>('-1');
  const [sortOption, setSortOption] = useState<string>('desc');

  return { entityType, readOption, sortOption, setEntityType, setReadOption, setSortOption };
};
