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

import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { CreateChatDto } from './dto/create-chat.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';

@Controller('chats')
@UseGuards(PrivateAuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService
  ) {}

  @Get(':id')
  async findOneChat(@Param('id', ParseIntPipe) id: number) {
    return await this.chatsService.findOneChat(id);
  }

  @Post()
  async createChat(@Body() dto: CreateChatDto) {
    return await this.chatsService.createChat(dto);
  }

  @Delete(':id')
  async deleteChat(@Param('id', ParseIntPipe) id: number) {
    return await this.chatsService.deleteChat(id);
  }

  @Get(':id/messages')
  async findChatMessages(@Param('id', ParseIntPipe) id: number) {
    return await this.messagesService.findMessagesByChatId(id);
  }

  @Post(':id/messages')
  async sendMessage(@Body() dto: SendMessageDto) {
    return await this.messagesService.sendMessage(dto);
  }

  @Patch(':id/messages/:messageId')
  async editMessage(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() dto: EditMessageDto
  ) {
    return await this.messagesService.editMessage(messageId, dto);
  }

  @Delete(':id/messages/:messageId')
  async deleteMessage(@Param('messageId', ParseIntPipe) messageId: number) {
    return await this.messagesService.deleteMessage(messageId);
  }
}
