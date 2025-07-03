import { Module } from '@nestjs/common';

import { MessagesModule } from '../messages/messages.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ReactionsController } from './reactions.controller';
import { ReactionsService } from './reactions.service';
import { ReactionsRepository } from './reactions-repository';

@Module({
  imports: [PrismaModule, MessagesModule],
  providers: [ReactionsService, ReactionsRepository],
  controllers: [ReactionsController],
})
export class ReactionsModule {}
