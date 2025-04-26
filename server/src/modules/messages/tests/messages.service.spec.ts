import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { MessagesService } from '../messages.service';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let prismaService: DeepMockProxy<PrismaService>;
  // let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        // PrismaService,
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(messagesService).toBeDefined();
  });

  describe('findMessagesByChatId', () => {
    it('should find messages by chat id', async () => {
      const chatId = 1;
      const messages = [
        {
          id: 19,
          senderId: 1,
          chatId,
          text: 'text-message-1',
          createdAt: new Date(),
          updatedAt: new Date(),
          sender: {
            id: 1,
            username: 'test-username1',
            email: 'test-email1@mail.com',
            name: 'test-name1',
            avatar: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: 20,
          senderId: 2,
          chatId,
          text: 'text-message-2',
          createdAt: new Date(),
          updatedAt: new Date(),
          sender: {
            id: 2,
            username: 'test-username2',
            email: 'test-email2@mail.com',
            name: 'test-name2',
            avatar: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
      prismaService.message.findMany.mockResolvedValueOnce(messages);

      const result = await messagesService.findMessagesByChatId(chatId);

      expect(prismaService.message.findMany).toHaveBeenCalled();
      expect(prismaService.message.findMany).toHaveBeenCalledWith({
        where: {
          chatId,
        },
        include: {
          sender: {
            omit: {
              password: true,
              description: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      expect(result).toStrictEqual(messages);
    });

    it('should not find messages by chat id', async () => {
      const chatId = 9999;
      const messages = [];
      prismaService.message.findMany.mockResolvedValueOnce([]);

      const result = await messagesService.findMessagesByChatId(chatId);

      expect(prismaService.message.findMany).toHaveBeenCalled();
      expect(prismaService.message.findMany).toHaveBeenCalledWith({
        where: {
          chatId,
        },
        include: {
          sender: {
            omit: {
              password: true,
              description: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      expect(result).toStrictEqual(messages);
    });
  });
});
