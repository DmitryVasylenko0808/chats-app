import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';

type TextAreaProps = ComponentProps<'textarea'> & {
  label?: string;
  error?: string;
};

export const TextArea = ({
  label,
  error,
  className,
  ref,
  ...textFieldProps
}: Readonly<TextAreaProps>) => {
  return (
    <div className={cn('relative w-full', className)}>
      {label && <label className="mb-2 block font-medium">{label}</label>}
      <textarea
        className={cn(
          'border-input focus:border-primary hover:border-primary block w-full rounded-2xl border-2 bg-white px-4 py-2 text-sm outline-0 duration-100 focus:ring-0',
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
