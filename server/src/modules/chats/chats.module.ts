import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './services/chats.service';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [PrismaModule],
  providers: [ChatsService, MessagesService, ChatsGateway],
  controllers: [ChatsController],
  exports: [ChatsService, MessagesService],
})
export class ChatsModule {}
