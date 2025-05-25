import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';
import { multerOptions } from '@/common/storage/multer.config';

import { EditMessageDto } from './dto/edit-message.dto';
import { ForwardMessageDto } from './dto/forward-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageEntity } from './entities/message.entity';
import { MessagesService } from './messages.service';

@Controller('chats/:chatId/messages')
@UseGuards(PrivateAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async findChatMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    const messages = await this.messagesService.findMessagesByChatId(chatId);
    return messages.map((m) => new MessageEntity(m));
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  async sendMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @CurrentUser('id') senderId: number,
    @Body() dto: SendMessageDto,
    @UploadedFiles() imageFiles: Express.Multer.File[]
  ) {
    const message = await this.messagesService.sendMessage({ chatId, senderId, dto, imageFiles });
    return new MessageEntity(message);
  }

  @Patch(':messageId')
  async editMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() dto: EditMessageDto
  ) {
    const message = await this.messagesService.editMessage(chatId, messageId, dto);
    return new MessageEntity(message);
  }

  @Delete(':messageId')
  async deleteMessage(@Param('messageId', ParseIntPipe) messageId: number) {
    const message = await this.messagesService.deleteMessage(messageId);
    return new MessageEntity(message);
  }

  @Post(':messageId/reply')
  async replyMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) replyToId: number,
    @CurrentUser('id') senderId: number,
    @Body() dto: SendMessageDto
  ) {
    const message = await this.messagesService.replyMessage({ replyToId, chatId, senderId, dto });
    return new MessageEntity(message);
  }

  @Post(':messageId/forward')
  async forwardMessage(
    @Param('messageId', ParseIntPipe) messageId: number,
    @CurrentUser('id') senderId: number,
    @Body() dto: ForwardMessageDto
  ) {
    const message = await this.messagesService.forwardMessage(messageId, senderId, dto);
    return new MessageEntity(message);
  }

  @Patch(':messageId/pin')
  async pinMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number
  ) {
    const message = await this.messagesService.pinMessage(chatId, messageId);
    return new MessageEntity(message);
  }

  @Patch(':messageId/unpin')
  async unpinMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number
  ) {
    const message = await this.messagesService.unpinMessage(chatId, messageId);
    return new MessageEntity(message);
  }
}
