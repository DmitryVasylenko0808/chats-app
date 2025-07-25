import { TabItem, Tabs, TabsProps } from '@/shared';

import { NotificationTabValue } from '../types';

const defaultTabs: TabItem<NotificationTabValue>[] = [
  { value: undefined, title: 'All' },
  { value: 'CHAT', title: 'Chats' },
  { value: 'MESSAGE', title: 'Messages' },
];

type NotificationTypeTabsProps = TabsProps<NotificationTabValue>;

export const NotificationTypeTabs = ({
  tabs = defaultTabs,
  activeValue,
  onClickTab,
}: Readonly<NotificationTypeTabsProps>) => {
  return <Tabs tabs={tabs} activeValue={activeValue} onClickTab={onClickTab} />;
};
