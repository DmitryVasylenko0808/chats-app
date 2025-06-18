import { Bookmark } from '@prisma/client';

type CreateMockBookmarkParams = {
  id: number;
  userId: number;
  messageId: number;
  overrides?: Partial<Bookmark>;
};

export const createMockBookmark = ({
  id,
  userId,
  messageId,
  overrides,
}: CreateMockBookmarkParams): Bookmark => ({
  id,
  userId,
  messageId,
  createdAt: new Date(),
  ...overrides,
});
