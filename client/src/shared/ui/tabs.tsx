import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

export type TabItem<T> = { value: T; title: string | number };
type TabsProps<T> = ComponentProps<'div'> & {
  tabs: TabItem<T>[];
  activeValue: T;
  onClickTab: (tab: T) => void;
};
export const Tabs = <T,>({
  tabs,
  activeValue,
  onClickTab,
  ...divProps
}: Readonly<TabsProps<T>>) => {
  return (
    <div className="flex" {...divProps}>
      {tabs.map((t, index) => (
        <Tab active={t.value === activeValue} key={index} onClick={() => onClickTab(t.value)}>
          {t.title}
        </Tab>
      ))}
    </div>
  );
};

type TabProps = ComponentProps<'button'> & { active: boolean };
const Tab = ({ active, children, ...btnProps }: Readonly<TabProps>) => {
  return (
    <button
      className={cn('text-typography-100 h-10 cursor-pointer px-4 font-medium', {
        'text-primary-200 border-primary-200 border-b-2 font-semibold': active,
      })}
      {...btnProps}
    >
      {children}
    </button>
  );
};
