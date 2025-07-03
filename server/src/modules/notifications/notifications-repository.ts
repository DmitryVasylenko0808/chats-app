import { Notification, NotificationType, User } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { NotificationQueryRequestDto } from './dto/requests';
import {
  CreateNotificationData,
  INotificationsRepository,
  NotificationsCountFilter,
  NotificationWithSender,
  UpdateNotificationData,
} from './interfaces/notifications-repository.interface';

@Injectable()
export class NotificationsRepository implements INotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(
    userId: number,
    queryOptions?: NotificationQueryRequestDto
  ): Promise<NotificationWithSender[]> {
    const { isRead, entityType, sortDate, page, limit } = queryOptions;

    return await this.prisma.notification.findMany({
      where: { userId, isRead, entityType },
      orderBy: { createdAt: sortDate },
      skip: limit * (page - 1),
      take: limit,
      include: {
        sender: true,
      },
    });
  }

  async createManyAndReturn(data: CreateNotificationData[]): Promise<NotificationWithSender[]> {
    return await this.prisma.notification.createManyAndReturn({
      data,
      include: {
        sender: true,
      },
    });
  }

  async updateOneById(id: number, data: UpdateNotificationData): Promise<Notification> {
    return await this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number): Promise<Notification> {
    return await this.prisma.notification.delete({
      where: { id },
    });
  }

  async deleteManyByUserId(userId: number): Promise<{ count: number }> {
    return await this.prisma.notification.deleteMany({
      where: { userId },
    });
  }

  async count(filter: NotificationsCountFilter): Promise<number> {
    return await this.prisma.notification.count({
      where: filter,
    });
  }
}
