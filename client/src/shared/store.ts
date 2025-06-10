import { create } from 'zustand';

import { Alert } from './types';

type AlertsState = { alerts: Alert[] };
type AlertsAction = {
  add: (data: Alert) => void;
  remove: (alert: Alert) => void;
};
type AlertsStore = AlertsState & AlertsAction;

const initialState: AlertsState = {
  alerts: [],
};
export const useAlertsStore = create<AlertsStore>()((set) => ({
  ...initialState,
  add: (data: Alert) => {
    set((store) => ({ ...store, alerts: [data, ...store.alerts] }));
  },
  remove: (alert: Alert) => {
    set((store) => ({ ...store, alerts: store.alerts.filter((a) => a !== alert) }));
  },
}));
