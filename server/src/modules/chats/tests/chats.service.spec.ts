import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockChat } from '@/common/test-utils/factories/chat.factory';

import { NotificationsService } from '@/modules/notifications/notifications.service';

import { ChatsRepository } from '../chats-repository';
import { CreateChatRequestDto } from '../dto/requests';
import { ChatsUtils } from '../providers/chats.utils';
import { ChatsRealtimeService } from '../services/chats-realtime.service';
import { ChatsService } from '../services/chats.service';

describe('ChatsService', () => {
  let chatsService: ChatsService;
  let chatsRepository: DeepMockProxy<ChatsRepository>;
  let chatsUtils: DeepMockProxy<ChatsUtils>;
  let chatsRealtimeService: DeepMockProxy<ChatsRealtimeService>;
  let notificationsService: DeepMockProxy<NotificationsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        { provide: ChatsRepository, useValue: mockDeep<ChatsRepository>() },
        { provide: ChatsUtils, useValue: mockDeep<ChatsUtils>() },
        { provide: ChatsRealtimeService, useValue: mockDeep<ChatsRealtimeService>() },
        { provide: NotificationsService, useValue: mockDeep<NotificationsService>() },
      ],
    }).compile();

    chatsService = module.get<ChatsService>(ChatsService);
    chatsRepository = module.get(ChatsRepository);
    chatsUtils = module.get(ChatsUtils);
    chatsRealtimeService = module.get(ChatsRealtimeService);
    notificationsService = module.get(NotificationsService);
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
      chatsUtils.sortChatsByLastMessage.mockReturnValueOnce(expectedResult);

      const result = await chatsService.findChats(userId);

      expect(chatsRepository.findManyByUserId).toHaveBeenCalled();
      expect(chatsUtils.sortChatsByLastMessage).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });

    it('should not find chats by user id', async () => {
      chatsRepository.findManyByUserId.mockResolvedValueOnce([]);
      chatsUtils.sortChatsByLastMessage.mockReturnValueOnce([]);

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

      chatsRepository.findExistingChatBetweenUsers.mockResolvedValueOnce(null);
      chatsRepository.create.mockResolvedValueOnce(mockCreatedChat);
      chatsRealtimeService.refreshMembersChats.mockResolvedValueOnce(undefined);
      notificationsService.notifyNewChat.mockResolvedValueOnce();

      const result = await chatsService.createChat(userId, dto);

      expect(chatsRepository.findExistingChatBetweenUsers).toHaveBeenCalled();
      expect(chatsRepository.create).toHaveBeenCalled();
      expect(chatsRealtimeService.refreshMembersChats).toHaveBeenCalled();
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
      expect(chatsRealtimeService.refreshMembersChats).not.toHaveBeenCalled();
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

      chatsRepository.delete.mockResolvedValueOnce(mockDeletedChat);
      chatsRealtimeService.refreshMembersChats.mockResolvedValueOnce(undefined);

      const result = await chatsService.deleteChat(id);

      expect(findOneChatOrThrowSpy).toHaveBeenCalled();
      expect(chatsRepository.delete).toHaveBeenCalled();
      expect(chatsRealtimeService.refreshMembersChats).toHaveBeenCalled();
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
