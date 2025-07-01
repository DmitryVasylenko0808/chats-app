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

import { NotificationPaginationDto } from './dto/notification-pagination.dto';
import { NotificationQueryDto } from './dto/notification-query.dto';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(PrivateAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async findNotifications(@CurrentUser('id') userId: number, @Query() query: NotificationQueryDto) {
    const notifications = await this.notificationsService.findNotifications(userId, query);
    return new NotificationPaginationDto(notifications);
  }

  @Get('unread-count')
  async getUnreadCountNotifications(@CurrentUser('id') userId: number) {
    return await this.notificationsService.getUnreadCountNotifications(userId);
  }

  @Patch(':id')
  async markAsReadNotification(@Param('id', ParseIntPipe) id: number) {
    const notification = await this.notificationsService.markAsReadNotification(id);
    return new NotificationEntity(notification);
  }

  @Delete()
  async deleteAllNotifications(@CurrentUser('id') userId: number) {
    return await this.notificationsService.deleteAllNotifications(userId);
  }

  @Delete(':id')
  async deleteNotificationById(@Param('id', ParseIntPipe) id: number) {
    const notification = await this.notificationsService.deleteNotificationById(id);
    return new NotificationEntity(notification);
  }
}
