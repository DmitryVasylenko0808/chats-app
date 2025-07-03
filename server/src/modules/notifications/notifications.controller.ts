import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { NotificationQueryRequestDto } from './dto/requests';
import {
  NotificationPaginationRequestDto,
  NotificationResponseDto,
  NotificationsCountResponseDto,
} from './dto/responses';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(PrivateAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findNotifications(
    @CurrentUser('id') userId: number,
    @Query() query: NotificationQueryRequestDto
  ) {
    const notifications = await this.notificationsService.findNotifications(userId, query);
    return new NotificationPaginationRequestDto(notifications);
  }

  @Get('unread-count')
  async getUnreadCountNotifications(@CurrentUser('id') userId: number) {
    return await this.notificationsService.getUnreadCountNotifications(userId);
  }

  @Patch(':id')
  async markAsReadNotification(@Param('id', ParseIntPipe) id: number) {
    const notification = await this.notificationsService.markAsReadNotification(id);
    return new NotificationResponseDto(notification);
  }

  @Delete()
  async deleteAllNotifications(@CurrentUser('id') userId: number) {
    const data = await this.notificationsService.deleteAllNotifications(userId);
    return new NotificationsCountResponseDto(data);
  }

  @Delete(':id')
  async deleteNotificationById(@Param('id', ParseIntPipe) id: number) {
    const notification = await this.notificationsService.deleteNotificationById(id);
    return new NotificationResponseDto(notification);
  }
}
