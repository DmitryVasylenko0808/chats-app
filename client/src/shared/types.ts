export type AlertVariant = 'info' | 'success' | 'error';
export type Alert = {
  id: string;
  text: string;
  variant: AlertVariant;
  title?: string;
};

export type PaginatinedDto<T> = {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
