import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PrivateAuthGuard } from 'src/common/guards/private-auth.guard';

import { MessagesService } from '../messages/messages.service';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

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
  async findChats(@Param('id', ParseIntPipe) id: number) {
    return await this.messagesService.findMessagesByChatId(id);
  }
}
