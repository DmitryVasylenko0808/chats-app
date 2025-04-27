import { User } from '@prisma/client';

export const createMockUser = (id: number, overrides?: Partial<User>): User => ({
  id,
  username: `username-${id}`,
  email: `email-${id}mail.com`,
  password: `password-${id}`,
  name: `name-${id}`,
  description: `description-${id}`,
  avatar: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
