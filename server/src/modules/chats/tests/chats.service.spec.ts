import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../modules/prisma/prisma.service';
import { ChatsService } from '../chats.service';

describe('ChatsService', () => {
  let chatsService: ChatsService;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatsService, { provide: PrismaService, useValue: mockDeep<PrismaService>() }],
    }).compile();

    chatsService = module.get<ChatsService>(ChatsService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(chatsService).toBeDefined();
  });

  describe('findChats', () => {
    const userId = 1;

    it('should find chats by user id', async () => {
      const mockFoundedChats = [
        {
          id: 1,
          members: [
            {
              name: 'name-1',
              id: 1,
              username: 'username-1',
              email: 'email-1',
              avatar: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              name: 'name-2',
              id: 2,
              username: 'username-2',
              email: 'email-2',
              avatar: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          messages: [
            {
              id: 11,
              senderId: 1,
              chatId: 1,
              text: 'text-1',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
        {
          id: 2,
          members: [
            {
              name: 'name-1',
              id: 1,
              username: 'username-1',
              email: 'email-1',
              avatar: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              name: 'name-3',
              id: 3,
              username: 'username-3',
              email: 'email-3',
              avatar: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          messages: [
            {
              id: 22,
              senderId: 1,
              chatId: 2,
              text: 'text-2',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ];
      const expectedResult = [
        {
          id: mockFoundedChats[1].id,
          members: mockFoundedChats[1].members,
          lastMessage: mockFoundedChats[1].messages[0],
        },
        {
          id: mockFoundedChats[0].id,
          members: mockFoundedChats[0].members,
          lastMessage: mockFoundedChats[0].messages[0],
        },
      ];
      prismaService.chat.findMany.mockResolvedValueOnce(mockFoundedChats);

      const result = await chatsService.findChats(userId);

      expect(prismaService.chat.findMany).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should not find chats by user id', async () => {
      prismaService.chat.findMany.mockResolvedValueOnce([]);

      const result = await chatsService.findChats(userId);

      expect(prismaService.chat.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findChatById', () => {
    const chatId = 1;

    it('should find chat by id', async () => {
      const mockFoundedChat = {
        id: 1,
        members: [{ id: 1 }, { id: 2 }],
      };
      const expectedResult = { id: 1, members: [{ id: 1 }, { id: 2 }], membersCount: 2 };
      prismaService.chat.findUnique.mockResolvedValueOnce(mockFoundedChat);

      const result = await chatsService.findOneChat(chatId);

      expect(prismaService.chat.findUnique).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error find chat by id (chat is not found)', async () => {
      prismaService.chat.findUnique.mockResolvedValueOnce(null);

      const findOneChat = chatsService.findOneChat(chatId);

      expect(prismaService.chat.findUnique).toHaveBeenCalled();
      expect(findOneChat).rejects.toThrow(NotFoundException);
    });
  });
});
