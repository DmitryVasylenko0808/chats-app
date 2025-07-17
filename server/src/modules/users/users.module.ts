import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepository } from './users-repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
