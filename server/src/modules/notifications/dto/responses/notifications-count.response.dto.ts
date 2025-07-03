export class NotificationsCountResponseDto {
  count: number;

  constructor(partial: Partial<NotificationsCountResponseDto>) {
    Object.assign(this, { ...partial });
  }
}
