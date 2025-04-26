import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { PrivateAuthGuard } from 'src/common/guards/private-auth.guard';

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
}
