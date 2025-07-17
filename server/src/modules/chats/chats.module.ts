import { Module } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatsRepository } from './chats-repository';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsUtils } from './providers/chats.utils';
import { ChatsRealtimeService } from './services/chats-realtime.service';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [PrismaModule, NotificationsModule],
  providers: [ChatsService, ChatsRealtimeService, ChatsGateway, ChatsRepository, ChatsUtils],
  controllers: [ChatsController],
  exports: [ChatsService, ChatsRealtimeService, ChatsRepository, ChatsGateway],
})
export class ChatsModule {}
