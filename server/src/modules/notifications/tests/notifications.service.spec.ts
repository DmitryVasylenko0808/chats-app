import { EntityType } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';

import { createMockChat } from '@/common/test-utils/factories/chat.factory';
import { createMockMessage } from '@/common/test-utils/factories/message.factory';
import { createMockNotification } from '@/common/test-utils/factories/notification.factory';
import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { NotificationsRepository } from '../notifications-repository';
import { NotificationsGateway } from '../notifications.gateway';
import { NotificationsService } from '../notifications.service';

describe('NotificationsService', () => {
  let notificationsService: NotificationsService;
  let notificationsRepository: DeepMockProxy<NotificationsRepository>;
  let notificationGateway: DeepMockProxy<NotificationsGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: NotificationsRepository, useValue: mockDeep<NotificationsRepository>() },
        { provide: NotificationsGateway, useValue: mockDeep<NotificationsGateway>() },
      ],
    }).compile();

    notificationsService = module.get<NotificationsService>(NotificationsService);
    notificationsRepository = module.get(NotificationsRepository);
    notificationGateway = module.get(NotificationsGateway);
  });

  it('should be defined', () => {
    expect(notificationsService).toBeDefined();
  });

  describe('findNotifications', () => {
    it('should return paginated notifications', async () => {
      const mockedNotifications = [
        { ...createMockNotification(1, 'NEW_MESSAGE'), sender: createMockUser(1) },
        { ...createMockNotification(1, 'NEW_MESSAGE'), sender: createMockUser(1) },
      ];
      notificationsRepository.findManyByUserId.mockResolvedValueOnce(mockedNotifications);
      notificationsRepository.count.mockResolvedValueOnce(mockedNotifications.length);

      const result = await notificationsService.findNotifications(1, {
        isRead: false,
        entityType: EntityType.MESSAGE,
        sortDate: 'asc',
        page: 1,
        limit: 10,
      });

      expect(result).toEqual({
        data: mockedNotifications,
        totalCount: 2,
        totalPages: 1,
        currentPage: 1,
      });
    });

    it('should return empty array of notifications', async () => {
      notificationsRepository.findManyByUserId.mockResolvedValueOnce([]);
      notificationsRepository.count.mockResolvedValueOnce(0);

      const result = await notificationsService.findNotifications(1, {
        isRead: false,
        entityType: EntityType.MESSAGE,
        sortDate: 'asc',
        page: 1,
        limit: 10,
      });

      expect(result).toEqual({
        data: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: 1,
      });
    });
  });

  describe('getUnreadCountNotifications', () => {
    it('should return count unread notifications', async () => {
      const userId = 1;
      const mockCount = 1;
      notificationsRepository.count.mockResolvedValueOnce(mockCount);

      await expect(notificationsService.getUnreadCountNotifications(userId)).resolves.toEqual({
        count: mockCount,
      });
      expect(notificationsRepository.count).toHaveBeenCalled();
    });
  });

  describe('notifyNewChat', () => {
    it('should send notification about new chat', async () => {
      const mockedUsers = [createMockUser(2)];
      const mockedCreator = createMockUser(1);
      const mockedChat = createMockChat(1, [mockedUsers[0].id, mockedCreator.id]);
      const mockedNotifications = [
        { ...createMockNotification(1, 'NEW_CHAT', { entityType: 'CHAT' }), sender: mockedCreator },
      ];
      notificationsRepository.createManyAndReturn.mockResolvedValueOnce(mockedNotifications);
      notificationGateway.sendNotifications.mockReturnValueOnce();

      await expect(
        notificationsService.notifyNewChat(mockedUsers, mockedCreator, mockedChat)
      ).resolves.toBeUndefined();
      expect(notificationsRepository.createManyAndReturn).toHaveBeenCalled();
      expect(notificationGateway.sendNotifications).toHaveBeenCalled();
    });
  });

  describe('notifyNewMessage', () => {
    it('should send notification about new message', async () => {
      const mockedUsers = [createMockUser(2)];
      const mockedMessage = createMockMessage(1, 1, 1);
      const mockedNotifications = [
        {
          ...createMockNotification(1, 'NEW_MESSAGE', {
            entityType: 'MESSAGE',
            data: { messageId: mockedMessage.id },
          }),
          sender: createMockUser(1),
        },
      ];
      notificationsRepository.createManyAndReturn.mockResolvedValueOnce(mockedNotifications);
      notificationGateway.sendNotifications.mockReturnValueOnce();

      await expect(
        notificationsService.notifyNewMessage(mockedUsers, mockedMessage)
      ).resolves.toBeUndefined();
      expect(notificationsRepository.createManyAndReturn).toHaveBeenCalled();
      expect(notificationGateway.sendNotifications).toHaveBeenCalled();
    });
  });

  describe('markAsReadNotification', () => {
    it('should mark notification as read', async () => {
      const id = 1;
      const mockedNotification = createMockNotification(id, 'NEW_MESSAGE');
      notificationsRepository.updateOneById.mockResolvedValueOnce(mockedNotification);

      await expect(notificationsService.markAsReadNotification(id)).resolves.toEqual(
        mockedNotification
      );
      expect(notificationsRepository.updateOneById).toHaveBeenCalled();
    });
  });

  describe('deleteAllNotifications', () => {
    it('should delete all notification', async () => {
      const userId = 1;
      notificationsRepository.deleteManyByUserId.mockResolvedValueOnce({ count: 2 });

      await expect(notificationsService.deleteAllNotifications(userId)).resolves.toEqual({
        count: 2,
      });
    });
  });

  describe('deleteNotificationById', () => {
    it('should delete one notification by id', async () => {
      const id = 1;
      const mockedNotification = createMockNotification(id, 'NEW_MESSAGE');

      notificationsRepository.deleteById.mockResolvedValueOnce(mockedNotification);

      await expect(notificationsService.deleteNotificationById(id)).resolves.toEqual(
        mockedNotification
      );
    });
  });
});
