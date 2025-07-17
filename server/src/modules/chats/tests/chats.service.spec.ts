import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockChat } from '@/common/test-utils/factories/chat.factory';

import { NotificationsService } from '@/modules/notifications/notifications.service';

import { ChatsRepository } from '../chats-repository';
import { ChatsGateway } from '../chats.gateway';
import { CreateChatRequestDto } from '../dto/requests';
import { ChatsService } from '../services/chats.service';

describe('ChatsService', () => {
  let chatsService: ChatsService;
  let chatsRepository: DeepMockProxy<ChatsRepository>;
  let notificationsService: DeepMockProxy<NotificationsService>;
  let chatsGateway: DeepMockProxy<ChatsGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        { provide: ChatsRepository, useValue: mockDeep<ChatsRepository>() },
        { provide: NotificationsService, useValue: mockDeep<NotificationsService>() },
        { provide: ChatsGateway, useValue: mockDeep<ChatsGateway>() },
      ],
    }).compile();

    chatsService = module.get<ChatsService>(ChatsService);
    chatsRepository = module.get(ChatsRepository);
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
      chatsRepository.findManyByUserId.mockResolvedValueOnce(mockFoundedChats);

      const result = await chatsService.findChats(userId);

      expect(chatsRepository.findManyByUserId).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should not find chats by user id', async () => {
      chatsRepository.findManyByUserId.mockResolvedValueOnce([]);

      const result = await chatsService.findChats(userId);

      expect(chatsRepository.findManyByUserId).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findChatById', () => {
    const chatId = 1;

    it('should find chat by id', async () => {
      const mockFoundedChat = createMockChat(chatId, [1, 2]);
      const expectedResult = mockFoundedChat;
      chatsRepository.findOneById.mockResolvedValueOnce(mockFoundedChat);

      const result = await chatsService.findOneChatOrThrow(chatId);

      expect(chatsRepository.findOneById).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error find chat by id (chat is not found)', async () => {
      chatsRepository.findOneById.mockResolvedValueOnce(null);

      const findOneChat = chatsService.findOneChatOrThrow(chatId);

      expect(chatsRepository.findOneById).toHaveBeenCalled();
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

      chatsRepository.findExistingChatBetweenUsers.mockResolvedValueOnce(null);
      chatsRepository.create.mockResolvedValueOnce(mockCreatedChat);
      notificationsService.notifyNewChat.mockResolvedValueOnce();

      const result = await chatsService.createChat(userId, dto);

      expect(chatsRepository.findExistingChatBetweenUsers).toHaveBeenCalled();
      expect(chatsRepository.create).toHaveBeenCalled();
      expect(refreshMembersChatsSpy).toHaveBeenCalled();
      expect(notificationsService.notifyNewChat).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should return existed chat', async () => {
      const dto: CreateChatRequestDto = { membersIds: [userId, 2] };
      const mockExistedChat = createMockChat(1, dto.membersIds);
      const expectedResult = mockExistedChat;

      chatsRepository.findExistingChatBetweenUsers.mockResolvedValueOnce(mockExistedChat);

      const result = await chatsService.createChat(userId, dto);

      expect(chatsRepository.findExistingChatBetweenUsers).toHaveBeenCalled();
      expect(chatsRepository.create).not.toHaveBeenCalled();
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

      chatsRepository.delete.mockResolvedValueOnce(mockDeletedChat);

      const result = await chatsService.deleteChat(id);

      expect(findOneChatOrThrowSpy).toHaveBeenCalled();
      expect(chatsRepository.delete).toHaveBeenCalled();
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
      expect(chatsRepository.delete).not.toHaveBeenCalled();
    });
  });
});
