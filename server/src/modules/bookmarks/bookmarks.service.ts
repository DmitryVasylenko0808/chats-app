import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AddBookmarkDto } from './dto/add-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBookmarks(userId: number) {
    return await this.prismaService.bookmark.findMany({
      where: { userId },
      include: {
        message: {
          include: { sender: true },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async addBookmark(userId: number, dto: AddBookmarkDto) {
    return await this.prismaService.bookmark.create({
      data: { userId, ...dto },
      include: {
        message: {
          include: { sender: true },
        },
      },
    });
  }

  async deleteBookmark(userId: number, id: number) {
    const bookmark = await this.findBookmarkOrThrow(userId, id);

    await this.prismaService.bookmark.delete({
      where: { id },
    });

    return bookmark;
  }

  private async findBookmarkOrThrow(userId: number, id: number) {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: { userId, id },
      include: {
        message: {
          include: { sender: true },
        },
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark is not found');
    }

    return bookmark;
  }
}
