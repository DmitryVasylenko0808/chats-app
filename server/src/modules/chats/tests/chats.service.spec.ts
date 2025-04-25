import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

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
});
