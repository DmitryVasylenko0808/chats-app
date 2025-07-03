import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockBookmark } from '@/common/test-utils/factories/bookmark.factory';
import { createMockMessage } from '@/common/test-utils/factories/message.factory';

import { BookmarksRepository } from '../bookmarks-repository';
import { BookmarksService } from '../bookmarks.service';

describe('BookmarksService', () => {
  let bookmarksService: BookmarksService;
  let bookmarksRepository: DeepMockProxy<BookmarksRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarksService,
        { provide: BookmarksRepository, useValue: mockDeep<BookmarksRepository>() },
      ],
    }).compile();

    bookmarksService = module.get<BookmarksService>(BookmarksService);
    bookmarksRepository = module.get(BookmarksRepository);
  });

  it('should be defined', () => {
    expect(bookmarksService).toBeDefined();
  });

  describe('getBookmarks', () => {
    const userId = 1;

    it('should return array of bookmarks', async () => {
      const mockedBookmarks = [
        {
          ...createMockBookmark({ id: 1, userId, messageId: 1 }),
          message: createMockMessage(1, 1, 1),
        },
        {
          ...createMockBookmark({ id: 2, userId, messageId: 2 }),
          message: createMockMessage(2, 2, 2),
        },
      ];

      bookmarksRepository.findManyByUserId.mockResolvedValueOnce(mockedBookmarks);

      const result = await bookmarksService.getBookmarks(userId);

      expect(bookmarksRepository.findManyByUserId).toHaveBeenCalled();
      expect(result).toEqual(mockedBookmarks);
    });
  });

  describe('addBookmark', () => {
    it('should add bookmark', async () => {
      const userId = 1;
      const messageId = 1;
      const mockedBookmark = {
        ...createMockBookmark({ id: 1, userId, messageId }),
        message: createMockMessage(messageId, 1, 1),
      };

      bookmarksRepository.create.mockResolvedValueOnce(mockedBookmark);

      const result = await bookmarksService.addBookmark(userId, { messageId });

      expect(bookmarksRepository.create).toHaveBeenCalled();
      expect(result).toEqual(mockedBookmark);
    });
  });

  describe('deleteBookmark', () => {
    const userId = 1;
    const id = 1;
    const messageId = 1;

    it('should delete bookmark', async () => {
      const mockedBookmark = {
        ...createMockBookmark({ id: 1, userId, messageId }),
        message: createMockMessage(messageId, 1, 1),
      };

      bookmarksRepository.findOne.mockResolvedValueOnce(mockedBookmark);
      bookmarksRepository.delete.mockResolvedValueOnce(undefined);

      const result = await bookmarksService.deleteBookmark(userId, id);

      expect(result).toEqual(mockedBookmark);
      expect(bookmarksRepository.findOne).toHaveBeenCalled();
      expect(bookmarksRepository.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if bookmark not found', async () => {
      bookmarksRepository.findOne.mockResolvedValueOnce(null);

      await expect(bookmarksService.deleteBookmark(userId, 9999)).rejects.toThrow(
        NotFoundException
      );
      expect(bookmarksRepository.findOne).toHaveBeenCalled();
      expect(bookmarksRepository.delete).not.toHaveBeenCalled();
    });
  });
});
