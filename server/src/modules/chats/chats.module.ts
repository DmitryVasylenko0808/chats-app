import { Module } from '@nestjs/common';

import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats-repository';

@Module({
  imports: [PrismaModule, NotificationsModule],
  providers: [ChatsService, ChatsGateway, ChatsRepository],
  controllers: [ChatsController],
  exports: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
