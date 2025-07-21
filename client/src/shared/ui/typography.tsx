import { cn } from '@/shared/lib/utils/cn';

import { ReactNode } from 'react';

type TypograpghyProps = {
  tagVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  children?: ReactNode;
};

export const Typograpghy = ({
  tagVariant = 'p',
  className,
  children,
}: Readonly<TypograpghyProps>) => {
  const Tag = tagVariant;

  return (
    <Tag
      className={cn(
        {
          'text-typography-200 dark:text-secondary-100 font-semibold':
            tagVariant === 'h1' ||
            tagVariant === 'h2' ||
            tagVariant === 'h3' ||
            tagVariant === 'h4' ||
            tagVariant === 'h5' ||
            tagVariant === 'h6',
          'text-base': tagVariant === 'h4' || tagVariant === 'h5' || tagVariant === 'h6',
          'text-2xl': tagVariant === 'h1',
          'text-xl': tagVariant === 'h2',
          'text-lg': tagVariant === 'h3',
          'text-typography-100': tagVariant === 'p',
        },
        className
      )}
    >
      {children}
    </Tag>
  );
};
