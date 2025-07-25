import { Option, Selector, Typograpghy } from '@/shared';

const defaultReadOptions: Option[] = [
  { value: '-1', label: 'All' },
  { value: '0', label: 'Unread' },
  { value: '1', label: 'Read' },
];
const defaultSortOptions: Option[] = [
  { value: 'asc', label: 'Oldest' },
  { value: 'desc', label: 'Newest' },
];

type NotificationsFiltersProps = {
  activeReadOption: string;
  activeSortOption: string;
  readOptions?: Option[];
  sortOptions?: Option[];
  onChangeReadOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeSortOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const NotificationsFilters = ({
  activeReadOption,
  activeSortOption,
  readOptions = defaultReadOptions,
  sortOptions = defaultSortOptions,
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
