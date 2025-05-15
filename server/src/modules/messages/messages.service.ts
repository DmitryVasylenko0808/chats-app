import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatsGateway } from '../chats/chats.gateway';
import { ChatsService } from '../chats/chats.service';
import { ReplyMessageParams } from '../chats/types/repty-message-params';
import { EditMessageDto } from './dto/edit-message.dto';
import { ForwardMessageDto } from './dto/forward-message.dto';
import { SendMessageDto } from './dto/send-message.dto';

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
        replyToMessage: {
          include: {
            sender: {
              omit: {
                password: true,
                description: true,
              },
            },
          },
        },
        forwardedMessage: {
          include: {
            sender: {
              omit: {
                password: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  }

  async sendMessage(chatId: number, userId: number, dto: SendMessageDto) {
    const message = await this.prismaService.message.create({
      data: { chatId, senderId: userId, ...dto },
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

  async editMessage(chatId: number, messageId: number, dto: EditMessageDto) {
    await this.findMessageByIdOrThrow(messageId);

    const message = await this.prismaService.message.update({
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

  async replyMessage(params: ReplyMessageParams) {
    const { replyToId, chatId, senderId, dto } = params;

    await this.findMessageByIdOrThrow(replyToId);

    const message = await this.prismaService.message.create({
      data: { replyToId, chatId, senderId, ...dto },
      include: {
        chat: {
          select: {
            members: true,
          },
        },
      },
    });
    const { chat, ...reply } = message;

    await this.refreshChatMessages(chatId);
    await this.chatsService.refreshMembersChats(chat.members);

    return reply;
  }

  async forwardMessage(messageId: number, senderId: number, dto: ForwardMessageDto) {
    await this.chatsService.findOneChatOrThrow(dto.targetChatId);
    await this.findMessageByIdOrThrow(messageId);

    const message = await this.prismaService.message.create({
      data: {
        senderId,
        chatId: dto.targetChatId,
        text: dto.text,
        forwardedMessageId: messageId,
      },
      include: {
        chat: {
          select: {
            id: true,
            members: true,
          },
        },
      },
    });
    const { chat, ...result } = message;

    await this.refreshChatMessages(chat.id);
    await this.chatsService.refreshMembersChats(chat.members);

    return result;
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
