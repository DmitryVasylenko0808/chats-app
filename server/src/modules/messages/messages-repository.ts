import { Message } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import {
  CreateMessageData,
  IMessagesRepository,
  UpdateMessageData,
} from './interfaces/message-repository.interface';
import { MessageWithRelations } from './types/message-with-relations';

@Injectable()
export class MessagesRepository implements IMessagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByChatId(chatId: number): Promise<MessageWithRelations[]> {
    return await this.prisma.message.findMany({
      where: { chatId },
      include: {
        sender: true,
        replyToMessage: {
          include: { sender: true },
        },
        forwardedMessage: {
          include: { sender: true },
        },
        reactions: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOneById(id: number): Promise<Message> {
    return await this.prisma.message.findUnique({
      where: { id },
    });
  }

  async create(data: CreateMessageData): Promise<Message> {
    return await this.prisma.message.create({ data });
  }

  async updateOne(data: UpdateMessageData, messageId: number, chatId?: number): Promise<Message> {
    return await this.prisma.message.update({
      where: { id: messageId, chatId },
      data,
    });
  }

  async updateManyByChatId(chatId: number, data: UpdateMessageData): Promise<{ count: number }> {
    return await this.prisma.message.updateMany({
      where: { chatId },
      data,
    });
  }

  async delete(id: number): Promise<Message> {
    return await this.prisma.message.delete({
      where: { id },
    });
  }
}
