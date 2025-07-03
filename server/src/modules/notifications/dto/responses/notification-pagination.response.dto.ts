import { Type } from 'class-transformer';

import { NotificationResponseDto } from './notification.response.dto';

export class NotificationPaginationRequestDto {
  @Type(() => NotificationResponseDto)
  data: NotificationResponseDto[];
  totalCount: number;
  totalPages: number;
  currentPage: number;

  constructor(partial?: Partial<NotificationPaginationRequestDto>) {
    const { data, totalCount, totalPages, currentPage } = partial;

    this.data = data.map((item) => new NotificationResponseDto(item));
    this.totalCount = totalCount;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}
