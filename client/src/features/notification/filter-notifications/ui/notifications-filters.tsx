import { Option, Selector, Typograpghy } from '@/shared';

type NotificationsFiltersProps = {
  readOptions: Option[];
  activeReadOption: string;
  sortOptions: Option[];
  activeSortOption: string;
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
    <div className="flex gap-3">
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
