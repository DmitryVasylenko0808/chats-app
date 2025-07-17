import { Injectable, NotFoundException } from '@nestjs/common';

import { ChatsRealtimeService } from '@/modules/chats/services/chats-realtime.service';
import { ChatsService } from '@/modules/chats/services/chats.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';

import { EditMessageRequestDto, ForwardMessageRequestDto } from './dto/requests';
import { MessagesRepository } from './messages-repository';
import { MessagingRoomsService } from './messaging-rooms.service';
import { ReplyMessageParams } from './types/reply-message-params';
import { SendMessageParams } from './types/send-message-params';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly messagingRoomsService: MessagingRoomsService,
    private readonly chatsService: ChatsService,
    private readonly chatsRealtimeService: ChatsRealtimeService,
    private readonly notificationService: NotificationsService
  ) {}

  async findMessagesByChatId(chatId: number) {
    return await this.messagesRepository.findManyByChatId(chatId);
  }

  async findMessageByIdOrThrow(id: number) {
    const existedMessage = await this.messagesRepository.findOneById(id);

    if (!existedMessage) {
      throw new NotFoundException('Message is not found');
    }

    return existedMessage;
  }

  async sendMessage(params: SendMessageParams) {
    const { chatId, senderId, dto, imageFiles } = params;

    const message = await this.messagesRepository.create({
      chatId,
      senderId,
      ...dto,
      images: imageFiles.map((img) => img.filename),
    });

    await this.messagingRoomsService.refreshChatMessages(message.chatId);
    await this.chatsRealtimeService.refreshMembersChats({ chatId: message.chatId });

    const absentMembers = await this.messagingRoomsService.findAbsentMembers(chatId);
    await this.notificationService.notifyNewMessage(absentMembers, message);

    return message;
  }

  async editMessage(chatId: number, messageId: number, dto: EditMessageRequestDto) {
    await this.findMessageByIdOrThrow(messageId);

    const message = await this.messagesRepository.updateOne(dto, messageId, chatId);

    await this.messagingRoomsService.refreshChatMessages(message.chatId);
    await this.chatsRealtimeService.refreshMembersChats({ chatId: message.chatId });

    return message;
  }

  async deleteMessage(id: number) {
    await this.findMessageByIdOrThrow(id);

    const deletedMessage = await this.messagesRepository.delete(id);

    await this.messagingRoomsService.refreshChatMessages(deletedMessage.chatId);
    await this.chatsRealtimeService.refreshMembersChats({ chatId: deletedMessage.chatId });

    return deletedMessage;
  }

  async replyMessage(params: ReplyMessageParams) {
    const { replyToId, chatId, senderId, dto } = params;

    await this.findMessageByIdOrThrow(replyToId);

    const message = await this.messagesRepository.create({ replyToId, chatId, senderId, ...dto });

    await this.messagingRoomsService.refreshChatMessages(message.chatId);
    await this.chatsRealtimeService.refreshMembersChats({ chatId: message.chatId });

    const absentMembers = await this.messagingRoomsService.findAbsentMembers(chatId);
    await this.notificationService.notifyNewMessage(absentMembers, message);

    return message;
  }

  async forwardMessage(messageId: number, senderId: number, dto: ForwardMessageRequestDto) {
    await this.chatsService.findOneChatOrThrow(dto.targetChatId);
    await this.findMessageByIdOrThrow(messageId);

    const message = await this.messagesRepository.create({
      senderId,
      chatId: dto.targetChatId,
      text: dto.text,
      forwardedMessageId: messageId,
    });

    await this.messagingRoomsService.refreshChatMessages(message.chatId);
    await this.chatsRealtimeService.refreshMembersChats({ chatId: message.chatId });

    const absentMembers = await this.messagingRoomsService.findAbsentMembers(message.chatId);
    await this.notificationService.notifyNewMessage(absentMembers, message);

    return message;
  }

  async pinMessage(chatId: number, messageId: number) {
    await this.findMessageByIdOrThrow(messageId);

    await this.messagesRepository.updateManyByChatId(chatId, { isPinned: false });
    const pinnedMessage = await this.messagesRepository.updateOne({ isPinned: true }, messageId);

    await this.messagingRoomsService.refreshChatMessages(pinnedMessage.chatId);

    return pinnedMessage;
  }

  async unpinMessage(chatId: number, messageId: number) {
    await this.findMessageByIdOrThrow(messageId);

    const unpinnedMessage = await this.messagesRepository.updateOne({ isPinned: false }, messageId);

    await this.messagingRoomsService.refreshChatMessages(chatId);

    return unpinnedMessage;
  }
}
