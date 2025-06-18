import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { BookmarksService } from './bookmarks.service';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@Controller('bookmarks')
@UseGuards(PrivateAuthGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  async getBookmarks(@CurrentUser('id') userId: number) {
    const bookmarks = await this.bookmarksService.getBookmarks(userId);
    return bookmarks.map((b) => new BookmarkEntity(b));
  }

  @Post()
  async addBookmark(@CurrentUser('id') userId: number, @Body() dto: AddBookmarkDto) {
    const bookmark = await this.bookmarksService.addBookmark(userId, dto);
    return new BookmarkEntity(bookmark);
  }

  @Delete(':id')
  async deleteBookmark(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) id: number) {
    const bookmark = await this.bookmarksService.deleteBookmark(userId, id);
    return new BookmarkEntity(bookmark);
  }
}
