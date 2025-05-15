import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { EditMessageDto } from './dto/edit-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MessagesService } from './messages.service';

@Controller('chats/:chatId/messages')
@UseGuards(PrivateAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findChatMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    return await this.messagesService.findMessagesByChatId(chatId);
  }

  @Post()
  async sendMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @CurrentUser('id') userId: number,
    @Body() dto: SendMessageDto
  ) {
    return await this.messagesService.sendMessage(chatId, userId, dto);
  }

  @Patch(':messageId')
  async editMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() dto: EditMessageDto
  ) {
    return await this.messagesService.editMessage(chatId, messageId, dto);
  }

  @Delete(':messageId')
  async deleteMessage(@Param('messageId', ParseIntPipe) messageId: number) {
    return await this.messagesService.deleteMessage(messageId);
  }

  @Post(':messageId/reply')
  async replyMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) replyToId: number,
    @CurrentUser('id') senderId: number,
    @Body() dto: SendMessageDto
  ) {
    return await this.messagesService.replyMessage({ replyToId, chatId, senderId, dto });
  }
}
