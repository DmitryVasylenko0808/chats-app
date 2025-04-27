import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../../modules/prisma/prisma.service';
import { ChatsGateway } from '../chats.gateway';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatsService } from '../services/chats.service';

describe('ChatsService', () => {
  let chatsService: ChatsService;
  let prismaService: DeepMockProxy<PrismaService>;
  let chatsGateway: DeepMockProxy<ChatsGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        { provide: ChatsGateway, useValue: mockDeep<ChatsGateway>() },
      ],
    }).compile();

    chatsService = module.get<ChatsService>(ChatsService);
    prismaService = module.get(PrismaService);
    chatsGateway = module.get(ChatsGateway);
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

  describe('createChat', () => {
    it('should create chat', async () => {
      const dto: CreateChatDto = { membersIds: [1, 2] };
      const mockCreatedChat = {
        id: 1,
        members: [{ id: 1 }, { id: 2 }],
      };
      prismaService.chat.findFirst.mockResolvedValueOnce(null);
      prismaService.chat.create.mockResolvedValueOnce(mockCreatedChat);
      const refreshMembersChatsSpy = jest
        .spyOn(chatsService, 'refreshMembersChats')
        .mockResolvedValueOnce(null);
      const expectedResult = mockCreatedChat;

      const result = await chatsService.createChat(dto);

      expect(prismaService.chat.findFirst).toHaveBeenCalled();
      expect(prismaService.chat.create).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalledWith(mockCreatedChat.members);
      expect(result).toEqual(expectedResult);
    });

    it('should return existed chat', async () => {
      const dto: CreateChatDto = { membersIds: [1, 2] };
      const mockExistedChat = {
        id: 1,
        members: [{ id: 1 }, { id: 2 }],
      };
      prismaService.chat.findFirst.mockResolvedValueOnce(mockExistedChat);
      const expectedResult = mockExistedChat;

      const result = await chatsService.createChat(dto);

      expect(prismaService.chat.findFirst).toHaveBeenCalled();
      expect(prismaService.chat.create).not.toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error create chat (members length !== 2)', async () => {
      const dto: CreateChatDto = { membersIds: [1] };

      const createChat = chatsService.createChat(dto);

      expect(createChat).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteChat', () => {
    it('should delete chat by id', async () => {
      const id = 1;
      const mockDeletedChat = {
        id: 1,
        members: [{ id: 1 }, { id: 2 }],
      };
      const expectMessage = { message: 'Chat is deleted' };
      prismaService.chat.findUnique.mockResolvedValueOnce({ id });
      prismaService.chat.delete.mockResolvedValueOnce(mockDeletedChat);
      const refreshMembersChatsSpy = jest
        .spyOn(chatsService, 'refreshMembersChats')
        .mockResolvedValueOnce(null);

      const result = await chatsService.deleteChat(id);

      expect(prismaService.chat.findUnique).toHaveBeenCalled();
      expect(prismaService.chat.delete).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalledWith(mockDeletedChat.members);
      expect(result).toEqual(expectMessage);
    });

    it('should throw error delete chat by id (chat is not found)', async () => {
      const id = 1;
      prismaService.chat.findUnique.mockResolvedValueOnce(null);

      await expect(chatsService.deleteChat(id)).rejects.toThrow(NotFoundException);
      expect(prismaService.chat.findUnique).toHaveBeenCalled();
      expect(prismaService.chat.delete).not.toHaveBeenCalled();
    });
  });
});
