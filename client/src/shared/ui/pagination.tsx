import { cn } from '@/utils/cn';

import { ComponentProps } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import { Button } from './button';

type PaginationProps = ComponentProps<'div'> & {
  totalPages?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};
export const Pagination = ({
  totalPages = 1,
  currentPage = 1,
  className,
  onPageChange,
  ...divProps
}: Readonly<PaginationProps>) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-4', className)} {...divProps}>
      {currentPage !== 1 && (
        <Button
          variant="text"
          className="text-primary-200 dark:text-primary-200"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <AiOutlineArrowLeft size={24} />
        </Button>
      )}
      <ul className="flex gap-4">
        {Array.from({ length: totalPages }).map((_, pageNumber) => (
          <li
            className={cn(
              'border-primary-200 text-primary-200 inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full border duration-100',
              {
                'bg-primary-200 disabled:bg-primary-300 hover:bg-primary-300 text-secondary-100':
                  pageNumber + 1 === currentPage,
              }
            )}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </li>
        ))}
      </ul>
      {currentPage !== totalPages && (
        <Button
          variant="text"
          className="text-primary-200 dark:text-primary-200"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <AiOutlineArrowRight size={24} />
        </Button>
      )}
    </div>
  );
};
