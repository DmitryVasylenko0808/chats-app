import { Chat, EntityType, Message, NotificationType, User } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { NotificationQueryDto } from './dto/notification-query.dto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationGateway: NotificationsGateway
  ) {}

  async findNotifications(userId: number, queryOptions?: NotificationQueryDto) {
    const { isRead, entityType, sortDate, page, limit } = queryOptions;

    const [notifications, totalCount] = await Promise.all([
      this.prismaService.notification.findMany({
        where: { userId, isRead, entityType },
        orderBy: { createdAt: sortDate },
        skip: limit * (page - 1),
        take: limit,
        include: {
          sender: true,
        },
      }),
      this.prismaService.notification.count({
        where: { userId, isRead, entityType },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: notifications,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  async notifyNewChat(users: User[], creator: User, chat: Chat) {
    const notifications = await this.prismaService.notification.createManyAndReturn({
      data: users.map((u) => ({
        type: NotificationType.NEW_CHAT,
        userId: u.id,
        senderId: creator.id,
        entityId: chat.id,
        entityType: EntityType.CHAT,
      })),
      include: {
        sender: true,
      },
    });

    this.notificationGateway.notify(notifications);
  }

  async notifyNewMessage(users: User[], message: Message) {
    const notifications = await this.prismaService.notification.createManyAndReturn({
      data: users.map((u) => ({
        type: NotificationType.NEW_MESSAGE,
        userId: u.id,
        senderId: message.senderId,
        entityId: message.id,
        entityType: EntityType.MESSAGE,
        data: { chatId: message.chatId },
      })),
      include: {
        sender: true,
      },
    });

    this.notificationGateway.notify(notifications);
  }

  async markAsReadNotification(id: number) {
    return await this.prismaService.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async deleteAllNotifications(userId: number) {
    return await this.prismaService.notification.deleteMany({
      where: { userId },
    });
  }

  async deleteNotificationById(id: number) {
    return await this.prismaService.notification.delete({
      where: { id },
    });
  }
}
