import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';

@Module({
  imports: [PrismaModule],
  providers: [BookmarksService],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
