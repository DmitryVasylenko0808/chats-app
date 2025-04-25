import { Controller, Get, Param, ParseIntPipe, UseFilters, UseGuards } from '@nestjs/common';

import { PrivateAuthGuard } from 'src/common/guards/private-auth.guard';

import { ChatsService } from './chats.service';

@Controller('chats')
@UseGuards(PrivateAuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':id')
  async findOneChat(@Param('id', ParseIntPipe) id: number) {
    return await this.chatsService.findOneChat(id);
  }
}
