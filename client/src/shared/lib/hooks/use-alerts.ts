import { v4 } from 'uuid';

import { useAlertsStore } from '../../model/alerts-store';
import { Alert } from '../../types';

export const useAlerts = () => {
  const { alerts, add, remove } = useAlertsStore();

  const notify = (data: Omit<Alert, 'id'>) => add({ id: v4(), ...data });
  const removeAlert = (data: Alert) => remove(data);

  return { alerts, notify, removeAlert };
};
