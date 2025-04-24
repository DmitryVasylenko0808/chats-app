import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: mockDeep<PrismaService>() }],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findUsers', () => {
    it('should find users by search value', async () => {
      const expectedResult = [
        {
          id: 3,
          username: 'lbroek2',
          email: 'lbroek2@hibu.com',
          name: 'Lilli Broek',
          avatar: null,
          createdAt: new Date('2025-04-24T06:06:20.172Z'),
          updatedAt: new Date('2025-04-24T06:06:20.172Z'),
        } as User,
      ];
      const search = 'lbroe';
      prismaService.user.findMany.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers(search);

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(expectedResult.length);
    });

    it('should not find users by search value', async () => {
      const expectedResult = [];
      prismaService.user.findMany.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers('abc');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });

    it('should not find users by empty search value', async () => {
      const expectedResult = [];
      prismaService.user.findMany.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers('');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });
  });
});
