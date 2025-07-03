import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { AddReactionRequestDto, DeleteReactionRequestDto } from './dto/requests';
import { ReactionsService } from './reactions.service';

@Controller('messages/:messageId/reactions')
@UseGuards(PrivateAuthGuard)
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  async addReaction(
    @Param('messageId', ParseIntPipe) messageId: number,
    @CurrentUser('id', ParseIntPipe) userId: number,
    @Body() dto: AddReactionRequestDto
  ) {
    return await this.reactionsService.addReaction(messageId, userId, dto.emoji);
  }

  @Delete()
  async deleteReaction(
    @Param('messageId', ParseIntPipe) messageId: number,
    @CurrentUser('id', ParseIntPipe) userId: number,
    @Body() dto: DeleteReactionRequestDto
  ) {
    return await this.reactionsService.deleteReaction(messageId, userId, dto.emoji);
  }
}
