import { Bookmark } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import {
  BookmarkWithRelation,
  CreateBookmarkData,
  IBookmarksRepository,
} from './interfaces/bookmarks-repository.interface';

@Injectable()
export class BookmarksRepository implements IBookmarksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: number): Promise<BookmarkWithRelation[]> {
    return await this.prisma.bookmark.findMany({
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

  async create(data: CreateBookmarkData): Promise<BookmarkWithRelation> {
    return await this.prisma.bookmark.create({
      data,
      include: {
        message: {
          include: { sender: true },
        },
      },
    });
  }

  async delete(id: number): Promise<Bookmark> {
    return await this.prisma.bookmark.delete({
      where: { id },
    });
  }

  async findOne(userId: number, id: number): Promise<BookmarkWithRelation> {
    return await this.prisma.bookmark.findFirst({
      where: { userId, id },
      include: {
        message: {
          include: { sender: true },
        },
      },
    });
  }
}
