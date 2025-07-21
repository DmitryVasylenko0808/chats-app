import { cn } from '@/shared/lib/utils/cn';

import { ComponentProps } from 'react';

import { Typograpghy } from './typography';

type TextFieldProps = ComponentProps<'input'> & {
  label?: string;
  error?: string;
};

export const TextField = ({
  label,
  error,
  className,
  ref,
  ...textFieldProps
}: Readonly<TextFieldProps>) => {
  return (
    <div className={cn('relative w-full', className)}>
      {label && <label className="dark:text-secondary-100 mb-2 block font-medium">{label}</label>}
      <input
        className={cn(
          'border-secondary-300 focus:border-primary-200 hover:border-primary-200 bg-secondary-100 dark:bg-dark-200 dark:border-dark-100 dark:placeholder:text-typography-100 dark:text-secondary-100 block w-full rounded-2xl border-2 px-4 py-2 text-sm outline-0 duration-100 focus:ring-0',
          {
            'border-red-400': error,
          }
        )}
        ref={ref}
        {...textFieldProps}
      />
      {error && <Typograpghy className="text-red mt-1 text-sm">{error}</Typograpghy>}
    </div>
  );
};
