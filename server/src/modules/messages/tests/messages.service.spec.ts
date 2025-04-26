import { Message } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { EditMessageDto } from '../dto/edit-message.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { MessagesService } from '../messages.service';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesService, { provide: PrismaService, useValue: mockDeep<PrismaService>() }],
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

  describe('sendMessage', () => {
    it('should send message', async () => {
      const dto: SendMessageDto = {
        chatId: 1,
        senderId: 1,
        text: 'text-message',
      };
      const message = {
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.message.create.mockResolvedValueOnce(message);

      const result = await messagesService.sendMessage(dto);

      expect(prismaService.message.create).toHaveBeenCalled();
      expect(prismaService.message.create).toHaveBeenCalledWith({
        data: dto,
      });
      expect(result).toEqual(message);
    });
  });

  describe('editMessage', () => {
    it('should edit message', async () => {
      const messageId = 1;
      const dto: EditMessageDto = {
        chatId: 1,
        text: 'text-message',
      };
      const message = {
        ...dto,
        id: 1,
        senderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.message.findUnique.mockResolvedValueOnce(message);
      prismaService.message.update.mockResolvedValueOnce(message);

      const result = await messagesService.editMessage(messageId, dto);

      expect(prismaService.message.findUnique).toHaveBeenCalled();
      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.update).toHaveBeenCalled();
      expect(prismaService.message.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(result).toEqual(message);
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
      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(editMessage).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteMessage', () => {
    it('should delete message', async () => {
      const messageId = 1;
      const data = { message: 'Message is deleted' };
      prismaService.message.findUnique.mockResolvedValueOnce({ id: messageId } as Message);
      prismaService.message.delete.mockResolvedValueOnce({ id: messageId } as Message);

      const result = await messagesService.deleteMessage(messageId);

      expect(prismaService.message.findUnique).toHaveBeenCalled();
      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.delete).toHaveBeenCalled();
      expect(prismaService.message.delete).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(result).toEqual(data);
    });

    it('should throw error delete message (message not found)', async () => {
      const messageId = 9999;
      prismaService.message.findUnique.mockResolvedValueOnce(null);

      const deleteMessage = messagesService.deleteMessage(messageId);

      expect(prismaService.message.findUnique).toHaveBeenCalled();
      expect(prismaService.message.findUnique).toHaveBeenCalledWith({
        where: { id: messageId },
      });
      expect(prismaService.message.update).not.toHaveBeenCalled();
      expect(deleteMessage).rejects.toThrow(NotFoundException);
    });
  });
});
