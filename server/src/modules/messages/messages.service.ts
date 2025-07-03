import { Injectable, NotFoundException } from '@nestjs/common';

import { ChatsGateway } from '@/modules/chats/chats.gateway';
import { ChatsService } from '@/modules/chats/chats.service';
import { NotificationsService } from '@/modules/notifications/notifications.service';

import { EditMessageRequestDto, ForwardMessageRequestDto } from './dto/requests';
import { MessagesRepository } from './messages-repository';
import { ReplyMessageParams } from './types/reply-message-params';
import { SendMessageParams } from './types/send-message-params';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly chatsService: ChatsService,
    private readonly notificationService: NotificationsService,
    private readonly chatsGateway: ChatsGateway
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

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    const absentChatMembers = await this.chatsService.findAbsentChatMembers(chatId);
    await this.notificationService.notifyNewMessage(absentChatMembers, message);

    return message;
  }

  async editMessage(chatId: number, messageId: number, dto: EditMessageRequestDto) {
    await this.findMessageByIdOrThrow(messageId);

    const message = await this.messagesRepository.updateOne(dto, messageId, chatId);

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    return message;
  }

  async deleteMessage(id: number) {
    await this.findMessageByIdOrThrow(id);

    const deletedMessage = await this.messagesRepository.delete(id);

    await this.refreshChatMessages(deletedMessage.chatId);
    await this.chatsService.refreshMembersChats({ chatId: deletedMessage.chatId });

    return deletedMessage;
  }

  async replyMessage(params: ReplyMessageParams) {
    const { replyToId, chatId, senderId, dto } = params;

    await this.findMessageByIdOrThrow(replyToId);

    const message = await this.messagesRepository.create({ replyToId, chatId, senderId, ...dto });

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    const absentChatMembers = await this.chatsService.findAbsentChatMembers(chatId);
    await this.notificationService.notifyNewMessage(absentChatMembers, message);

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

    await this.refreshChatMessages(message.chatId);
    await this.chatsService.refreshMembersChats({ chatId: message.chatId });

    const absentChatMembers = await this.chatsService.findAbsentChatMembers(message.chatId);
    await this.notificationService.notifyNewMessage(absentChatMembers, message);

    return message;
  }

  async pinMessage(chatId: number, messageId: number) {
    await this.findMessageByIdOrThrow(messageId);

    await this.messagesRepository.updateManyByChatId(chatId, { isPinned: false });
    const pinnedMessage = await this.messagesRepository.updateOne({ isPinned: true }, messageId);

    await this.refreshChatMessages(pinnedMessage.chatId);

    return pinnedMessage;
  }

  async unpinMessage(chatId: number, messageId: number) {
    await this.findMessageByIdOrThrow(messageId);

    const unpinnedMessage = await this.messagesRepository.updateOne({ isPinned: false }, messageId);

    await this.refreshChatMessages(chatId);

    return unpinnedMessage;
  }

  async refreshChatMessages(chatId: number) {
    const messages = await this.findMessagesByChatId(chatId);

    this.chatsGateway.emitUpdateMessages(chatId, messages);
  }
}
