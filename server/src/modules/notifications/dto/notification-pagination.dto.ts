import { NotificationEntity } from '../entities/notification.entity';

export class NotificationPaginationDto {
  data: NotificationEntity[];
  totalCount: number;
  totalPages: number;
  currentPage: number;

  constructor(partial?: Partial<NotificationPaginationDto>) {
    const { data, totalCount, totalPages, currentPage } = partial;

    this.data = data.map((item) => new NotificationEntity(item));
    this.totalCount = totalCount;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}
