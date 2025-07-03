import { Chat, EntityType, Message, NotificationType, User } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { NotificationQueryRequestDto } from './dto/requests';
import { NotificationsRepository } from './notifications-repository';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly notificationGateway: NotificationsGateway
  ) {}

  async findNotifications(userId: number, queryOptions?: NotificationQueryRequestDto) {
    const { isRead, entityType, page, limit } = queryOptions;

    const [notifications, totalCount] = await Promise.all([
      this.notificationsRepository.findManyByUserId(userId, queryOptions),
      this.notificationsRepository.count({ userId, isRead, entityType }),
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: notifications,
      totalCount,
      totalPages,
      currentPage: page,
    };
  }

  async getUnreadCountNotifications(userId: number) {
    const count = await this.notificationsRepository.count({ userId, isRead: false });

    return { count };
  }

  async notifyNewChat(users: User[], creator: User, chat: Chat) {
    const notifications = await this.notificationsRepository.createManyAndReturn(
      users.map((u) => ({
        type: NotificationType.NEW_CHAT,
        userId: u.id,
        senderId: creator.id,
        entityId: chat.id,
        entityType: EntityType.CHAT,
      }))
    );

    this.notificationGateway.sendNotifications(notifications);
  }

  async notifyNewMessage(users: User[], message: Message) {
    const notifications = await this.notificationsRepository.createManyAndReturn(
      users.map((u) => ({
        type: NotificationType.NEW_MESSAGE,
        userId: u.id,
        senderId: message.senderId,
        entityId: message.id,
        entityType: EntityType.MESSAGE,
        data: { chatId: message.chatId },
      }))
    );

    this.notificationGateway.sendNotifications(notifications);
  }

  async markAsReadNotification(id: number) {
    return await this.notificationsRepository.updateOneById(id, { isRead: true });
  }

  async deleteAllNotifications(userId: number) {
    return await this.notificationsRepository.deleteManyByUserId(userId);
  }

  async deleteNotificationById(id: number) {
    return await this.notificationsRepository.deleteById(id);
  }
}
