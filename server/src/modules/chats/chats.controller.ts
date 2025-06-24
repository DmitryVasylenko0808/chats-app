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

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntity } from './entities/chat.entity';

@Controller('chats')
@UseGuards(PrivateAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  async findOneChat(@Param('id', ParseIntPipe) id: number) {
    const chat = await this.chatsService.findOneChatOrThrow(id);
    return new ChatEntity(chat);
  }

  @Post()
  async createChat(@CurrentUser('id') userId: number, @Body() dto: CreateChatDto) {
    const chat = await this.chatsService.createChat(userId, dto);
    return new ChatEntity(chat);
  }

  @Delete(':id')
  async deleteChat(@Param('id', ParseIntPipe) id: number) {
    const chat = await this.chatsService.deleteChat(id);
    return new ChatEntity(chat);
  }
}
