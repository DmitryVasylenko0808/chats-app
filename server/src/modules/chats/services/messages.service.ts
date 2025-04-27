import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ChatsGateway } from '../chats.gateway';
import { EditMessageDto } from '../dto/edit-message.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { ChatsService } from './chats.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatsService: ChatsService,
    private readonly chatsGateway: ChatsGateway
  ) {}

  async findMessagesByChatId(chatId: number) {
    const messages = await this.prismaService.message.findMany({
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

    return messages;
  }

  async sendMessage(dto: SendMessageDto) {
    const message = await this.prismaService.message.create({
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
    const { chat, ...messageData } = message;

    await this.refreshChatMessages(chat.id);
    await this.chatsService.refreshMembersChats(chat.members);

    return messageData;
  }

  async editMessage(id: number, dto: EditMessageDto) {
    await this.findMessageByIdOrThrow(id);

    const message = await this.prismaService.message.update({
      where: { id },
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
    const { chat, ...messageData } = message;

    await this.refreshChatMessages(chat.id);
    await this.chatsService.refreshMembersChats(chat.members);

    return messageData;
  }

  async deleteMessage(id: number) {
    await this.findMessageByIdOrThrow(id);

    const deletedMessage = await this.prismaService.message.delete({
      where: { id },
      include: {
        chat: {
          select: {
            id: true,
            members: true,
          },
        },
      },
    });
    const { chat } = deletedMessage;

    await this.refreshChatMessages(chat.id);
    await this.chatsService.refreshMembersChats(chat.members);

    return { message: 'Message is deleted' };
  }

  async refreshChatMessages(chatId: number) {
    const messages = await this.findMessagesByChatId(chatId);

    this.chatsGateway.emitUpdateMessages(chatId, messages);
  }

  private async findMessageByIdOrThrow(id: number) {
    const existedMessage = await this.prismaService.message.findUnique({
      where: { id },
    });

    if (!existedMessage) {
      throw new NotFoundException('Message is not found');
    }

    return existedMessage;
  }
}
