import { cn } from '@/shared/lib/utils/cn';

import { ComponentProps } from 'react';

export type Option<T extends string = string> = {
  value: T;
  label: string;
};
type SelectorProps<T extends string = string> = ComponentProps<'select'> & {
  options: Option<T>[];
};

export const Selector = <T extends string = string>({
  options,
  className,
  ...selectProps
}: Readonly<SelectorProps<T>>) => {
  return (
    <select
      className={cn(
        'border-secondary-300 focus:border-primary-200 hover:border-primary-200 bg-secondary-100 dark:bg-dark-200 dark:border-dark-100 dark:placeholder:text-typography-100 dark:text-secondary-100 block w-full rounded-2xl border-2 px-4 py-2 text-sm outline-0 duration-100 focus:ring-0',
        className
      )}
      {...selectProps}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
