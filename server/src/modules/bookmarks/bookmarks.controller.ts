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
import { AddBookmarkRequestDto } from './dto/requests';
import { BookmarkResponseDto } from './dto/responses';

@Controller('bookmarks')
@UseGuards(PrivateAuthGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  async getBookmarks(@CurrentUser('id') userId: number) {
    const bookmarks = await this.bookmarksService.getBookmarks(userId);
    return bookmarks.map((b) => new BookmarkResponseDto(b));
  }

  @Post()
  async addBookmark(@CurrentUser('id') userId: number, @Body() dto: AddBookmarkRequestDto) {
    const bookmark = await this.bookmarksService.addBookmark(userId, dto);
    return new BookmarkResponseDto(bookmark);
  }

  @Delete(':id')
  async deleteBookmark(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) id: number) {
    const bookmark = await this.bookmarksService.deleteBookmark(userId, id);
    return new BookmarkResponseDto(bookmark);
  }
}
