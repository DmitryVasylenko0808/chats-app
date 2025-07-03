import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockChat } from '@/common/test-utils/factories/chat.factory';
import { createMockMessage } from '@/common/test-utils/factories/message.factory';
import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { ChatsGateway } from '@/modules/chats/chats.gateway';
import { ChatsService } from '@/modules/chats/chats.service';
import { ReplyMessageParams } from '@/modules/messages/types/reply-message-params';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { MessagesService } from '../../messages/messages.service';
import {
  EditMessageRequestDto,
  ForwardMessageRequestDto,
  SendMessageRequestDto,
} from '../dto/requests';
import { MessagesRepository } from '../messages-repository';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let messagesRepository: DeepMockProxy<MessagesRepository>;
  let chatsService: DeepMockProxy<ChatsService>;
  let notificationsService: DeepMockProxy<NotificationsService>;
  let chatsGateway: DeepMockProxy<ChatsGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: MessagesRepository, useValue: mockDeep<MessagesRepository>() },
        { provide: ChatsService, useValue: mockDeep<ChatsService>() },
        { provide: NotificationsService, useValue: mockDeep<NotificationsService>() },
        { provide: ChatsGateway, useValue: mockDeep<ChatsGateway>() },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    messagesRepository = module.get(MessagesRepository);
    chatsService = module.get(ChatsService);
    notificationsService = module.get(NotificationsService);
    chatsGateway = module.get(ChatsGateway);
  });

  it('should be defined', () => {
    expect(messagesService).toBeDefined();
  });

  describe('findMessagesByChatId', () => {
    it('should find messages by chat id', async () => {
      const chatId = 1;
      const messages = [
        { ...createMockMessage(19, chatId, 1, createMockUser(1)), reactions: [] },
        { ...createMockMessage(20, chatId, 2, createMockUser(2)), reactions: [] },
      ];

      messagesRepository.findManyByChatId.mockResolvedValueOnce(messages);

      const result = await messagesService.findMessagesByChatId(chatId);

      expect(messagesRepository.findManyByChatId).toHaveBeenCalled();
      expect(result).toStrictEqual(messages);
    });

    it('should not find messages by chat id', async () => {
      const chatId = 9999;
      const messages = [];
      messagesRepository.findManyByChatId.mockResolvedValueOnce([]);

      const result = await messagesService.findMessagesByChatId(chatId);

      expect(messagesRepository.findManyByChatId).toHaveBeenCalled();
      expect(result).toStrictEqual(messages);
    });
  });

  describe('sendMessage', () => {
    it('should send message', async () => {
      const chatId = 1;
      const senderId = 1;
      const dto: SendMessageRequestDto = {
        text: 'text-message',
      };
      const imageFiles = [];
      const mockCreatedMessage = createMockMessage(1, chatId, senderId);
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);
      messagesRepository.create.mockResolvedValueOnce(mockCreatedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);
      chatsService.findAbsentChatMembers.mockResolvedValueOnce([]);
      notificationsService.notifyNewMessage.mockResolvedValueOnce();

      const result = await messagesService.sendMessage({ chatId, senderId, dto, imageFiles });

      expect(messagesRepository.create).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalled();
      expect(chatsService.findAbsentChatMembers).toHaveBeenCalled();
      expect(notificationsService.notifyNewMessage).toHaveBeenCalled();
      expect(result).toEqual(mockCreatedMessage);
    });
  });

  describe('editMessage', () => {
    it('should edit message', async () => {
      const messageId = 1;
      const chatId = 1;
      const dto: EditMessageRequestDto = {
        text: 'text-message',
      };
      const mockFoundedMessage = createMockMessage(messageId, chatId, 1);
      const mockEditedMessage = mockFoundedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(mockFoundedMessage);
      messagesRepository.updateOne.mockResolvedValueOnce(mockEditedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.editMessage(chatId, messageId, dto);

      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.updateOne).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalled();
      expect(result).toEqual(mockEditedMessage);
    });

    it('should throw error edit message (message is not found)', async () => {
      const messageId = 9999;
      const chatId = 1;
      const dto: EditMessageRequestDto = {
        text: 'text-message',
      };
      messagesRepository.findOneById.mockResolvedValueOnce(null);

      const editMessage = messagesService.editMessage(chatId, messageId, dto);

      expect(messagesRepository.updateOne).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(editMessage).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteMessage', () => {
    it('should delete message', async () => {
      const messageId = 1;
      const mockFoundedMessage = createMockMessage(messageId, 1, 1);
      const mockDeletedMessage = mockFoundedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(mockFoundedMessage);
      messagesRepository.delete.mockResolvedValueOnce(mockDeletedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.deleteMessage(messageId);

      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.delete).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalled();
      expect(result).toEqual(mockDeletedMessage);
    });

    it('should throw error delete message (message not found)', async () => {
      const messageId = 9999;
      messagesRepository.findOneById.mockResolvedValueOnce(null);

      const deleteMessage = messagesService.deleteMessage(messageId);

      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.delete).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(deleteMessage).rejects.toThrow(NotFoundException);
    });
  });

  describe('replyMessage', () => {
    it('should reply message', async () => {
      const params: ReplyMessageParams = {
        replyToId: 1,
        chatId: 1,
        senderId: 1,
        dto: {
          text: 'Text-message',
        },
      };
      const mockFoundedMessage = createMockMessage(1, 1, 1);
      const mockCreatedMessage = {
        ...createMockMessage(10, 1, 1, createMockUser(1), { replyToId: 1 }),
      };

      messagesRepository.findOneById.mockResolvedValueOnce(mockFoundedMessage);
      messagesRepository.create.mockResolvedValueOnce(mockCreatedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);
      chatsService.findAbsentChatMembers.mockResolvedValueOnce([]);
      notificationsService.notifyNewMessage.mockResolvedValueOnce();

      const result = await messagesService.replyMessage(params);

      expect(result).toEqual(mockCreatedMessage);
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.create).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalled();
      expect(chatsService.findAbsentChatMembers).toHaveBeenCalled();
      expect(notificationsService.notifyNewMessage).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
    });

    it('should throw error reply message (message is not found)', async () => {
      const params: ReplyMessageParams = {
        replyToId: 9999,
        chatId: 1,
        senderId: 1,
        dto: {
          text: 'Text-message',
        },
      };
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(null);

      expect(messagesService.replyMessage(params)).rejects.toThrow(NotFoundException);
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.create).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(chatsService.findAbsentChatMembers).not.toHaveBeenCalled();
      expect(notificationsService.notifyNewMessage).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
    });
  });

  describe('forwardMessage', () => {
    it('should forward message with text', async () => {
      const messageId = 1;
      const senderId = 1;
      const forwardMessageDto: ForwardMessageRequestDto = {
        targetChatId: 2,
        text: 'text-message',
      };
      const mockFoundedChat = { ...createMockChat(2, [1, 2], [11, 12]), membersCount: 2 };
      const mockFoundedMessage = createMockMessage(1, 1, 1);
      const mockCreatedMessage = createMockMessage(10, 1, 1, createMockUser(1));
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      chatsService.findOneChatOrThrow.mockResolvedValueOnce(mockFoundedChat);
      messagesRepository.findOneById.mockResolvedValueOnce(mockFoundedMessage);

      messagesRepository.create.mockResolvedValueOnce(mockCreatedMessage);
      chatsService.findAbsentChatMembers.mockResolvedValueOnce([]);
      notificationsService.notifyNewMessage.mockResolvedValueOnce();

      const result = await messagesService.forwardMessage(messageId, senderId, forwardMessageDto);

      expect(result).toEqual(mockCreatedMessage);
      expect(chatsService.findOneChatOrThrow).toHaveBeenCalled();
      expect(messagesRepository.create).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalled();
      expect(chatsService.findAbsentChatMembers).toHaveBeenCalled();
      expect(notificationsService.notifyNewMessage).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
    });

    it('should throw error forward message (Chat is not found)', async () => {
      const messageId = 1;
      const senderId = 1;
      const forwardMessageDto: ForwardMessageRequestDto = {
        targetChatId: 9999,
        text: 'text-message',
      };
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      chatsService.findOneChatOrThrow.mockRejectedValueOnce(new NotFoundException());

      expect(
        messagesService.forwardMessage(messageId, senderId, forwardMessageDto)
      ).rejects.toThrow(NotFoundException);
      expect(chatsService.findOneChatOrThrow).toHaveBeenCalled();
      expect(messagesRepository.create).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(chatsService.findAbsentChatMembers).not.toHaveBeenCalled();
      expect(notificationsService.notifyNewMessage).not.toHaveBeenCalled();
    });

    it('should throw error forward message (Message is not found)', async () => {
      const messageId = 999;
      const senderId = 1;
      const forwardMessageDto: ForwardMessageRequestDto = {
        targetChatId: 2,
        text: 'text-message',
      };
      const mockFoundedChat = { ...createMockChat(2, [1, 2], [11, 12]), membersCount: 2 };
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      chatsService.findOneChatOrThrow.mockResolvedValueOnce(mockFoundedChat);

      messagesRepository.findOneById.mockResolvedValueOnce(null);

      expect(
        messagesService.forwardMessage(messageId, senderId, forwardMessageDto)
      ).rejects.toThrow(NotFoundException);
      expect(chatsService.findOneChatOrThrow).toHaveBeenCalled();
      expect(messagesRepository.create).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(chatsService.findAbsentChatMembers).not.toHaveBeenCalled();
      expect(notificationsService.notifyNewMessage).not.toHaveBeenCalled();
    });
  });

  describe('pinMessage', () => {
    it('should pin message', async () => {
      const chatId = 1;
      const messageId = 1;
      const mockFoundedMessage = createMockMessage(messageId, chatId, 1);
      const mockUpdatedMessage = mockFoundedMessage;
      const expected = mockUpdatedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(mockFoundedMessage);
      messagesRepository.updateManyByChatId.mockResolvedValueOnce({ count: 1 });
      messagesRepository.updateOne.mockResolvedValueOnce(mockUpdatedMessage);

      await expect(messagesService.pinMessage(chatId, messageId)).resolves.toEqual(expected);
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.updateManyByChatId).toHaveBeenCalled();
      expect(messagesRepository.updateOne).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
    });

    it('should throw error (Message is not found)', async () => {
      const chatId = 1;
      const messageId = 1;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(null);

      await expect(messagesService.pinMessage(chatId, messageId)).rejects.toThrow(
        NotFoundException
      );
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.updateManyByChatId).not.toHaveBeenCalled();
      expect(messagesRepository.updateOne).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
    });
  });

  describe('unpinMessage', () => {
    it('should unpin message', async () => {
      const chatId = 1;
      const messageId = 1;
      const mockFoundedMessage = createMockMessage(messageId, chatId, 1);
      const updatedMessage = mockFoundedMessage;
      const expected = updatedMessage;

      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(mockFoundedMessage);
      messagesRepository.updateOne.mockResolvedValueOnce(updatedMessage);

      await expect(messagesService.unpinMessage(chatId, messageId)).resolves.toEqual(expected);
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.updateOne).toHaveBeenCalled();
      expect(refreshChatMessagesSpy).toHaveBeenCalled();
    });

    it('should throw errro (Message is not found)', async () => {
      const chatId = 1;
      const messageId = 1;

      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      messagesRepository.findOneById.mockResolvedValueOnce(null);

      await expect(messagesService.unpinMessage(chatId, messageId)).rejects.toThrow(
        NotFoundException
      );
      expect(messagesRepository.findOneById).toHaveBeenCalled();
      expect(messagesRepository.updateOne).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
    });
  });
});
