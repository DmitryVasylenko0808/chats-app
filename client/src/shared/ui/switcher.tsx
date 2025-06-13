import { ComponentProps } from 'react';

type SwitcherProps = Omit<ComponentProps<'input'>, 'type'>;

export const Switcher = (switcherProps: Readonly<SwitcherProps>) => {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" className="peer sr-only" {...switcherProps} />
      <div className="peer bg-secondary-300 peer-checked:bg-primary-200 after:border-secondary-300 after:bg-secondary-100 peer-checked:after:border-secondary-100 dark:border-dark-200 dark:bg-dark-200 dark:peer-checked:bg-primary-200 relative h-6 w-11 rounded-full peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:transition-all after:content-[''] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
    </label>
  );
};
