import { Message } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { ChatsGateway } from '../chats.gateway';
import { EditMessageDto } from '../dto/edit-message.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { ChatsService } from '../services/chats.service';
import { MessagesService } from '../services/messages.service';

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

  describe('sendMessage', () => {
    it('should send message', async () => {
      const dto: SendMessageDto = {
        chatId: 1,
        senderId: 1,
        text: 'text-message',
      };
      const mockCreatedMessage = {
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        chat: {
          id: 1,
          members: [{ id: 1 }, { id: 2 }],
        },
      };
      const { chat, ...expectedMessage } = mockCreatedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);
      prismaService.message.create.mockResolvedValueOnce(mockCreatedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.sendMessage(dto);

      expect(prismaService.message.create).toHaveBeenCalledWith({
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
  });

  describe('editMessage', () => {
    it('should edit message', async () => {
      const messageId = 1;
      const dto: EditMessageDto = {
        chatId: 1,
        text: 'text-message',
      };
      const mockFoundedMessage = {
        ...dto,
        id: 1,
        senderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockEditedMessage = {
        ...dto,
        id: 1,
        senderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        chat: {
          id: 1,
          members: [{ id: 1 }, { id: 2 }],
        },
      };
      const { chat, ...expectedMessage } = mockEditedMessage;
      const refreshChatMessagesSpy = jest
        .spyOn(messagesService, 'refreshChatMessages')
        .mockResolvedValueOnce(null);
      prismaService.message.findUnique.mockResolvedValueOnce(mockFoundedMessage);
      prismaService.message.update.mockResolvedValueOnce(mockEditedMessage);
      chatsService.refreshMembersChats.mockResolvedValueOnce(null);

      const result = await messagesService.editMessage(messageId, dto);

      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.update).toHaveBeenCalledWith({
        where: { id: 1 },
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
      const dto: EditMessageDto = {
        chatId: 1,
        text: 'text-message',
      };
      prismaService.message.findUnique.mockResolvedValueOnce(null);

      const editMessage = messagesService.editMessage(messageId, dto);

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
      const mockFoundedMessage = {
        id: 1,
        chatId: 1,
        senderId: 1,
        text: 'text-message',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockEditedMessage = {
        ...mockFoundedMessage,
        chat: {
          id: 1,
          members: [{ id: 1 }, { id: 2 }],
        },
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
});
