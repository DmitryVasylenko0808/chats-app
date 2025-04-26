import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { PrivateAuthGuard } from 'src/common/guards/private-auth.guard';

import { EditMessageDto } from './dto/edit-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
@UseGuards(PrivateAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async sendMessage(@Body() dto: SendMessageDto) {
    return await this.messagesService.sendMessage(dto);
  }

  @Patch(':id')
  async editMessage(@Param('id', ParseIntPipe) id: number, @Body() dto: EditMessageDto) {
    return await this.messagesService.editMessage(id, dto);
  }
}
