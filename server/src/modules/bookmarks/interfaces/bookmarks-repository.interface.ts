import { Bookmark, Message, User } from '@prisma/client';

type MessageWithSender = Message & { sender: User };
export type BookmarkWithRelation = Bookmark & {
  message: MessageWithSender;
};

export type CreateBookmarkData = {
  userId: number;
  messageId: number;
  createdAt?: Date;
};

export interface IBookmarksRepository {
  findManyByUserId(userId: number): Promise<BookmarkWithRelation[]>;
  create(data: CreateBookmarkData): Promise<BookmarkWithRelation>;
  delete(id: number): Promise<Bookmark>;
  findOne(userId: number, id: number): Promise<BookmarkWithRelation>;
}
