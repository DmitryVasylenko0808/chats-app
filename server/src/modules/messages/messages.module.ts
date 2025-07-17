import { Module } from '@nestjs/common';

import { ChatsModule } from '../chats/chats.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesRepository } from './messages-repository';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './services/messages.service';
import { MessagingRoomsService } from './services/messaging-rooms.service';

@Module({
  imports: [PrismaModule, ChatsModule, NotificationsModule],
  providers: [MessagesService, MessagingRoomsService, MessagesRepository, MessagesGateway],
  controllers: [MessagesController],
  exports: [MessagesService, MessagingRoomsService],
})
export class MessagesModule {}
