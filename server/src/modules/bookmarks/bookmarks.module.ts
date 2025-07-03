import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { BookmarksRepository } from './bookmarks-repository';

@Module({
  imports: [PrismaModule],
  providers: [BookmarksService, BookmarksRepository],
  controllers: [BookmarksController],
})
export class BookmarksModule {}
