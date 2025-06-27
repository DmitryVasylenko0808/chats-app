import { Option, Selector, Typograpghy } from '@/shared/ui';

import { ReadOptionValue, SortDateOptionValue } from '../types';

type NotificationsFiltersProps = {
  readOptions: Option<ReadOptionValue>[];
  activeReadOption: ReadOptionValue | number;
  sortOptions: Option<SortDateOptionValue>[];
  activeSortOption: SortDateOptionValue | string;
  onChangeReadOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSortOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const NotificationsFilters = ({
  readOptions,
  activeReadOption,
  sortOptions,
  activeSortOption,
  onChangeReadOption,
  onChangeSortOption,
}: Readonly<NotificationsFiltersProps>) => {
  return (
    <div className="my-2 flex justify-end gap-4 px-4">
      <div className="inline-flex items-center gap-2">
        <Typograpghy>Filter:</Typograpghy>
        <Selector options={readOptions} value={activeReadOption} onChange={onChangeReadOption} />
      </div>
      <div className="inline-flex items-center gap-2">
        <Typograpghy>Sort:</Typograpghy>
        <Selector options={sortOptions} value={activeSortOption} onChange={onChangeSortOption} />
      </div>
    </div>
  );
};
