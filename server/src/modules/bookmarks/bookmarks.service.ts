import { Injectable, NotFoundException } from '@nestjs/common';

import { BookmarksRepository } from './bookmarks-repository';
import { AddBookmarkRequestDto } from './dto/requests';

@Injectable()
export class BookmarksService {
  constructor(private readonly bookmarksRepository: BookmarksRepository) {}

  async getBookmarks(userId: number) {
    return await this.bookmarksRepository.findManyByUserId(userId);
  }

  async addBookmark(userId: number, dto: AddBookmarkRequestDto) {
    return await this.bookmarksRepository.create({ userId, ...dto });
  }

  async deleteBookmark(userId: number, id: number) {
    const bookmark = await this.findBookmarkOrThrow(userId, id);

    await this.bookmarksRepository.delete(id);

    return bookmark;
  }

  private async findBookmarkOrThrow(userId: number, id: number) {
    const bookmark = await this.bookmarksRepository.findOne(userId, id);

    if (!bookmark) {
      throw new NotFoundException('Bookmark is not found');
    }

    return bookmark;
  }
}
