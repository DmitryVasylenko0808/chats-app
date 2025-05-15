import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockChat } from '@/common/test-utils/factories/chat.factory';
import { createMockMessage } from '@/common/test-utils/factories/message.factory';
import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { ChatsGateway } from '@/modules/chats/chats.gateway';
import { ChatsService } from '@/modules/chats/chats.service';
import { ReplyMessageParams } from '@/modules/chats/types/repty-message-params';
import { PrismaService } from '@/modules/prisma/prisma.service';

import { MessagesService } from '../../messages/messages.service';
import { EditMessageDto } from '../dto/edit-message.dto';
import { ForwardMessageDto } from '../dto/forward-message.dto';
import { SendMessageDto } from '../dto/send-message.dto';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let prismaService: DeepMockProxy<PrismaService>;
  let chatsService: DeepMockProxy<ChatsService>;
  let chatsGateway: DeepMockProxy<ChatsGateway>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        { provide: ChatsService, useValue: mockDeep<ChatsService>() },
        { provide: ChatsGateway, useValue: mockDeep<ChatsGateway>() },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    prismaService = module.get(PrismaService);
    chatsService = module.get(ChatsService);
    chatsGateway = module.get(ChatsGateway);
  });

  it('should be defined', () => {
    expect(messagesService).toBeDefined();
  });

  describe('findMessagesByChatId', () => {
    it('should find messages by chat id', async () => {
      const chatId = 1;
      const messages = [
        createMockMessage(19, chatId, 1, createMockUser(1)),
        createMockMessage(20, chatId, 2, createMockUser(2)),
      ];
      prismaService.message.findMany.mockResolvedValueOnce(messages);

      const result = await messagesService.findMessagesByChatId(chatId);

      expect(prismaService.message.findMany).toHaveBeenCalled();
      expect(result).toStrictEqual(messages);
    });

    it('should not find messages by chat id', async () => {
      const chatId = 9999;
      const messages = [];
      prismaService.message.findMany.mockResolvedValueOnce([]);

      const result = await messagesService.findMessagesByChatId(chatId);

      expect(prismaService.message.findMany).toHaveBeenCalled();
      expect(result).toStrictEqual(messages);
    });
  });

  describe('sendMessage', () => {
    it('should send message', async () => {
      const chatId = 1;
      const senderId = 1;
      const dto: SendMessageDto = {
        text: 'text-message',
      };
      const mockCreatedMessage = {
        ...createMockMessage(1, chatId, senderId),
        chat: createMockChat(chatId, [1, 2], [11, 12]),
      };
      const { chat, ...expectedMessage } = mockCreatedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);
      prismaService.message.create.mockResolvedValueOnce(mockCreatedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.sendMessage(chatId, senderId, dto);

      expect(prismaService.message.create).toHaveBeenCalledWith({
        data: { chatId, senderId, ...dto },
        include: {
          chat: {
            select: {
              id: true,
              members: true,
            },
          },
        },
      });
      expect(refreshChatMessagesSpy).toHaveBeenCalledWith(chat.id);
      expect(chatsService.refreshMembersChats).toHaveBeenCalledWith(chat.members);
      expect(result).toEqual(expectedMessage);
    });
  });

  describe('editMessage', () => {
    it('should edit message', async () => {
      const messageId = 1;
      const chatId = 1;
      const dto: EditMessageDto = {
        text: 'text-message',
      };
      const mockFoundedMessage = createMockMessage(messageId, chatId, 1);
      const mockEditedMessage = {
        ...mockFoundedMessage,
        ...dto,
        chat: createMockChat(chatId, [1, 2]),
      };
      const { chat, ...expectedMessage } = mockEditedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      prismaService.message.findUnique.mockResolvedValueOnce(mockFoundedMessage);
      prismaService.message.update.mockResolvedValueOnce(mockEditedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.editMessage(chatId, messageId, dto);

      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.update).toHaveBeenCalledWith({
        where: { id: messageId, chatId },
        data: dto,
        include: {
          chat: {
            select: {
              id: true,
              members: true,
            },
          },
        },
      });
      expect(refreshChatMessagesSpy).toHaveBeenCalledWith(chat.id);
      expect(chatsService.refreshMembersChats).toHaveBeenCalledWith(chat.members);
      expect(result).toEqual(expectedMessage);
    });

    it('should throw error edit message (message is not found)', async () => {
      const messageId = 9999;
      const chatId = 1;
      const dto: EditMessageDto = {
        text: 'text-message',
      };
      prismaService.message.findUnique.mockResolvedValueOnce(null);

      const editMessage = messagesService.editMessage(chatId, messageId, dto);

      expect(prismaService.message.update).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(editMessage).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteMessage', () => {
    it('should delete message', async () => {
      const messageId = 1;
      const mockFoundedMessage = createMockMessage(messageId, 1, 1);
      const mockEditedMessage = {
        ...mockFoundedMessage,
        chat: createMockChat(1, [1, 2]),
      };
      const data = { message: 'Message is deleted' };
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      prismaService.message.findUnique.mockResolvedValueOnce(mockFoundedMessage);
      prismaService.message.delete.mockResolvedValueOnce(mockEditedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.deleteMessage(messageId);

      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.delete).toHaveBeenCalledWith({
        where: { id: messageId },
        include: {
          chat: {
            select: {
              id: true,
              members: true,
            },
          },
        },
      });
      expect(refreshChatMessagesSpy).toHaveBeenCalledWith(mockEditedMessage.chat.id);
      expect(chatsService.refreshMembersChats).toHaveBeenCalledWith(mockEditedMessage.chat.members);
      expect(result).toEqual(data);
    });

    it('should throw error delete message (message not found)', async () => {
      const messageId = 9999;
      prismaService.message.findUnique.mockResolvedValueOnce(null);

      const deleteMessage = messagesService.deleteMessage(messageId);

      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.delete).not.toHaveBeenCalled();
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
        chat: createMockChat(params.chatId, [1, 2], [11, 12]),
      };
      const { chat, ...expected } = mockCreatedMessage;

      prismaService.message.findUnique.mockResolvedValueOnce(mockFoundedMessage);
      prismaService.message.create.mockResolvedValueOnce(mockCreatedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      const result = await messagesService.replyMessage(params);

      expect(result).toEqual(expected);
      expect(prismaService.message.findUnique).toHaveBeenCalled();
      expect(prismaService.message.create).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalledWith(chat.members);
      expect(refreshChatMessagesSpy).toHaveBeenCalledWith(chat.id);
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

      prismaService.message.findUnique.mockResolvedValueOnce(null);

      expect(messagesService.replyMessage(params)).rejects.toThrow(NotFoundException);
      expect(prismaService.message.findUnique).toHaveBeenCalled();
      expect(prismaService.message.create).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
    });
  });

  describe('forwardMessage', () => {
    it('should forward message with text', async () => {
      const messageId = 1;
      const senderId = 1;
      const forwardMessageDto: ForwardMessageDto = {
        targetChatId: 2,
        text: 'text-message',
      };
      const mockFoundedChat = { ...createMockChat(2, [1, 2], [11, 12]), membersCount: 2 };
      const mockFoundedMessage = createMockMessage(1, 1, 1);
      const mockCreatedMessage = {
        ...createMockMessage(10, 1, 1, createMockUser(1)),
        chat: createMockChat(forwardMessageDto.targetChatId, [1, 2], [11, 12]),
      };
      const { chat, ...expected } = mockCreatedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      chatsService.findOneChat.mockResolvedValueOnce(mockFoundedChat);
      prismaService.message.findUnique.mockResolvedValueOnce(mockFoundedMessage);
      prismaService.message.create.mockResolvedValueOnce(mockCreatedMessage);

      const result = await messagesService.forwardMessage(messageId, senderId, forwardMessageDto);

      expect(result).toEqual(expected);
      expect(prismaService.message.create).toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).toHaveBeenCalledWith(chat.members);
      expect(refreshChatMessagesSpy).toHaveBeenCalledWith(chat.id);
    });

    it('should throw error forward message (Chat is not found)', async () => {
      const messageId = 1;
      const senderId = 1;
      const forwardMessageDto: ForwardMessageDto = {
        targetChatId: 9999,
        text: 'text-message',
      };
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      chatsService.findOneChat.mockResolvedValueOnce(null);

      expect(
        messagesService.forwardMessage(messageId, senderId, forwardMessageDto)
      ).rejects.toThrow(NotFoundException);
      expect(chatsService.findOneChat).toHaveBeenCalled();
      expect(prismaService.message.create).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
    });

    it('should throw error forward message (Message is not found)', async () => {
      const messageId = 999;
      const senderId = 1;
      const forwardMessageDto: ForwardMessageDto = {
        targetChatId: 2,
        text: 'text-message',
      };
      const mockFoundedChat = { ...createMockChat(2, [1, 2], [11, 12]), membersCount: 2 };
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);

      chatsService.findOneChat.mockResolvedValueOnce(mockFoundedChat);
      prismaService.message.findUnique.mockResolvedValueOnce(null);

      expect(
        messagesService.forwardMessage(messageId, senderId, forwardMessageDto)
      ).rejects.toThrow(NotFoundException);
      expect(prismaService.message.create).not.toHaveBeenCalled();
      expect(refreshChatMessagesSpy).not.toHaveBeenCalled();
      expect(chatsService.refreshMembersChats).not.toHaveBeenCalled();
    });
  });
});
