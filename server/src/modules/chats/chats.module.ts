import { Module } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatsRepository } from './chats-repository';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { ChatsUtils } from './chats.utils';

@Module({
  imports: [PrismaModule, NotificationsModule],
  providers: [ChatsService, ChatsGateway, ChatsRepository, ChatsUtils],
  controllers: [ChatsController],
  exports: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
