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
import { CreateChatRequestDto } from './dto/requests';
import { ChatResponseDto } from './dto/responses';

@Controller('chats')
@UseGuards(PrivateAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  async findOneChat(@Param('id', ParseIntPipe) id: number) {
    const chat = await this.chatsService.findOneChatOrThrow(id);
    return new ChatResponseDto(chat);
  }

  @Post()
  async createChat(@CurrentUser('id') userId: number, @Body() dto: CreateChatRequestDto) {
    const chat = await this.chatsService.createChat(userId, dto);
    return new ChatResponseDto(chat);
  }

  @Delete(':id')
  async deleteChat(@Param('id', ParseIntPipe) id: number) {
    const chat = await this.chatsService.deleteChat(id);
    return new ChatResponseDto(chat);
  }
}
