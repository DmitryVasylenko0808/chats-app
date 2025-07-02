import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockChat } from '@/common/test-utils/factories/chat.factory';

import { NotificationsService } from '@/modules/notifications/notifications.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatsGateway } from '../chats.gateway';
import { ChatsService } from '../chats.service';
import { CreateChatRequestDto } from '../dto/requests';

describe('ChatsService', () => {
  let chatsService: ChatsService;
  let prismaService: DeepMockProxy<PrismaService>;
  let notificationsService: DeepMockProxy<NotificationsService>;
  let chatsGateway: DeepMockProxy<ChatsGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        { provide: NotificationsService, useValue: mockDeep<NotificationsService>() },
        { provide: ChatsGateway, useValue: mockDeep<ChatsGateway>() },
      ],
    }).compile();

    chatsService = module.get<ChatsService>(ChatsService);
    prismaService = module.get(PrismaService);
    notificationsService = module.get(NotificationsService);
    chatsGateway = module.get(ChatsGateway);
  });

  it('should be defined', () => {
    expect(chatsService).toBeDefined();
  });

  describe('findChats', () => {
    const userId = 1;

    it('should find chats by user id', async () => {
      const mockFoundedChats = [createMockChat(1, [1, 2], [11]), createMockChat(2, [1, 3], [22])];
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
      const mockFoundedChat = createMockChat(chatId, [1, 2]);
      const expectedResult = mockFoundedChat;
      prismaService.chat.findUnique.mockResolvedValueOnce(mockFoundedChat);

      const result = await chatsService.findOneChatOrThrow(chatId);

      expect(prismaService.chat.findUnique).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error find chat by id (chat is not found)', async () => {
      prismaService.chat.findUnique.mockResolvedValueOnce(null);

      const findOneChat = chatsService.findOneChatOrThrow(chatId);

      expect(prismaService.chat.findUnique).toHaveBeenCalled();
      expect(findOneChat).rejects.toThrow(NotFoundException);
    });
  });

  describe('createChat', () => {
    const userId = 1;

    it('should create chat', async () => {
      const dto: CreateChatRequestDto = { membersIds: [userId, 2] };
      const mockCreatedChat = createMockChat(1, dto.membersIds);
      const expectedResult = mockCreatedChat;
      const refreshMembersChatsSpy = jest
        .spyOn(chatsService, 'refreshMembersChats')
        .mockResolvedValueOnce(null);

      prismaService.chat.findFirst.mockResolvedValueOnce(null);
      prismaService.chat.create.mockResolvedValueOnce(mockCreatedChat);
      notificationsService.notifyNewChat.mockResolvedValueOnce();

      const result = await chatsService.createChat(userId, dto);

      expect(prismaService.chat.findFirst).toHaveBeenCalled();
      expect(prismaService.chat.create).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalled();
      expect(notificationsService.notifyNewChat).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should return existed chat', async () => {
      const dto: CreateChatRequestDto = { membersIds: [userId, 2] };
      const mockExistedChat = createMockChat(1, dto.membersIds);
      const expectedResult = mockExistedChat;

      prismaService.chat.findFirst.mockResolvedValueOnce(mockExistedChat);

      const result = await chatsService.createChat(userId, dto);

      expect(prismaService.chat.findFirst).toHaveBeenCalled();
      expect(prismaService.chat.create).not.toHaveBeenCalled();
      expect(notificationsService.notifyNewChat).not.toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error create chat (members length !== 2)', async () => {
      const dto: CreateChatRequestDto = { membersIds: [userId] };

      const createChat = chatsService.createChat(userId, dto);

      expect(createChat).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteChat', () => {
    it('should delete chat by id', async () => {
      const id = 1;
      const mockFoundedChat = createMockChat(1, [1, 2]);
      const mockDeletedChat = mockFoundedChat;
      const findOneChatOrThrowSpy = jest
        .spyOn(chatsService, 'findOneChatOrThrow')
        .mockResolvedValueOnce(mockFoundedChat);
      const refreshMembersChatsSpy = jest
        .spyOn(chatsService, 'refreshMembersChats')
        .mockResolvedValueOnce(null);

      prismaService.chat.delete.mockResolvedValueOnce(mockDeletedChat);

      const result = await chatsService.deleteChat(id);

      expect(findOneChatOrThrowSpy).toHaveBeenCalled();
      expect(prismaService.chat.delete).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalled();
      expect(result).toEqual(mockDeletedChat);
    });

    it('should throw error delete chat by id (chat is not found)', async () => {
      const id = 1;
      const findOneChatOrThrowSpy = jest
        .spyOn(chatsService, 'findOneChatOrThrow')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(chatsService.deleteChat(id)).rejects.toThrow(NotFoundException);
      expect(findOneChatOrThrowSpy).toHaveBeenCalled();
      expect(prismaService.chat.delete).not.toHaveBeenCalled();
    });
  });
});
