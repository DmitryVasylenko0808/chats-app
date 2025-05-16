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
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  async sendMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @CurrentUser('id') senderId: number,
    @Body() dto: SendMessageDto,
    @UploadedFiles() imageFiles: Express.Multer.File[]
  ) {
    return await this.messagesService.sendMessage({ chatId, senderId, dto, imageFiles });
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

  @Post(':messageId/forward')
  async forwardMessage(
    @Param('messageId', ParseIntPipe) messageId: number,
    @CurrentUser('id') senderId: number,
    @Body() dto: ForwardMessageDto
  ) {
    return await this.messagesService.forwardMessage(messageId, senderId, dto);
  }

  @Patch(':messageId/pin')
  async pinMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number
  ) {
    return this.messagesService.pinMessage(chatId, messageId);
  }

  @Patch(':messageId/unpin')
  async unpinMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('messageId', ParseIntPipe) messageId: number
  ) {
    return this.messagesService.unpinMessage(chatId, messageId);
  }
}
