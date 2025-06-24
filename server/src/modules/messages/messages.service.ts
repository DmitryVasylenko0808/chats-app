import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { ChatsGateway } from '../chats/chats.gateway';
import { ChatsService } from '../chats/chats.service';
import { NotificationsService } from '../notifications/notifications.service';
import { EditMessageDto } from './dto/edit-message.dto';
import { ForwardMessageDto } from './dto/forward-message.dto';
import { ReplyMessageParams } from './types/reply-message-params';
import { SendMessageParams } from './types/send-message-params';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatsService: ChatsService,
    private readonly notificationService: NotificationsService,
    private readonly chatsGateway: ChatsGateway
  ) {}

  async findMessagesByChatId(chatId: number) {
    return await this.prismaService.message.findMany({
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

  async sendMessage(params: SendMessageParams) {
    const { chatId, senderId, dto, imageFiles } = params;

    const message = await this.prismaService.message.create({
      data: { chatId, senderId, ...dto, images: imageFiles.map((img) => img.filename) },
    });

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    const absentChatMembers = await this.chatsService.findAbsentChatMembers(chatId);
    await this.notificationService.notifyNewMessage(absentChatMembers, message);

    return message;
  }

  async editMessage(chatId: number, messageId: number, dto: EditMessageDto) {
    await this.findMessageByIdOrThrow(messageId);

    const message = await this.prismaService.message.update({
      where: { id: messageId, chatId },
      data: dto,
    });

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    return message;
  }

  async deleteMessage(id: number) {
    await this.findMessageByIdOrThrow(id);

    const deletedMessage = await this.prismaService.message.delete({
      where: { id },
    });

    await this.refreshChatMessages(deletedMessage.chatId);
    await this.chatsService.refreshMembersChats({ chatId: deletedMessage.chatId });

    return deletedMessage;
  }

  async replyMessage(params: ReplyMessageParams) {
    const { replyToId, chatId, senderId, dto } = params;

    await this.findMessageByIdOrThrow(replyToId);

    const message = await this.prismaService.message.create({
      data: { replyToId, chatId, senderId, ...dto },
    });

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    const absentChatMembers = await this.chatsService.findAbsentChatMembers(chatId);
    await this.notificationService.notifyNewMessage(absentChatMembers, message);

    return message;
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
    });

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    const absentChatMembers = await this.chatsService.findAbsentChatMembers(message.chatId);
    await this.notificationService.notifyNewMessage(absentChatMembers, message);

    return message;
  }

  async pinMessage(chatId: number, messageId: number) {
    await this.findMessageByIdOrThrow(messageId);

    await this.prismaService.message.updateMany({
      where: { chatId },
      data: { isPinned: false },
    });

    const pinnedMessage = await this.prismaService.message.update({
      where: { id: messageId },
      data: { isPinned: true },
    });

    await this.refreshChatMessages(pinnedMessage.chatId);

    return pinnedMessage;
  }

  async unpinMessage(chatId: number, messageId: number) {
    await this.findMessageByIdOrThrow(messageId);

    const unpinnedMessage = await this.prismaService.message.update({
      where: { id: messageId },
      data: { isPinned: false },
    });

    await this.refreshChatMessages(unpinnedMessage.chatId);

    return unpinnedMessage;
  }

  async refreshChatMessages(chatId: number) {
    const messages = await this.findMessagesByChatId(chatId);

    this.chatsGateway.emitUpdateMessages(chatId, messages);
  }

  async findMessageByIdOrThrow(id: number) {
    const existedMessage = await this.prismaService.message.findUnique({
      where: { id },
    });

    if (!existedMessage) {
      throw new NotFoundException('Message is not found');
    }

    return existedMessage;
  }
}
