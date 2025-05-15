import { Module } from '@nestjs/common';

import { ChatsModule } from '../chats/chats.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [PrismaModule, ChatsModule],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
