import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

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
      {label && <label className="mb-2 block font-medium">{label}</label>}
      <input
        className={cn(
          'border-secondary-300 focus:border-primary-200 hover:border-primary-200 bg-secondary-100 block w-full rounded-2xl border-2 px-4 py-2 text-sm outline-0 duration-100 focus:ring-0',
          {
            'border-red-400': error,
          }
        )}
        ref={ref}
        {...textFieldProps}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
