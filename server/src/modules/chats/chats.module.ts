import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ChatsController } from './chats.controller';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [PrismaModule],
  providers: [ChatsService, MessagesService, ChatsGateway],
  controllers: [ChatsController],
  exports: [ChatsService, MessagesService],
})
export class ChatsModule {}
