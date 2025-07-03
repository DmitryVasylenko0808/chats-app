import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsRepository } from './notifications-repository';

@Module({
  imports: [PrismaModule],
  providers: [NotificationsService, NotificationsGateway, NotificationsRepository],
  exports: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
