import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
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

  describe('findUserOrThrow', () => {
    it('should find user by id', async () => {
      const id = 1;
      const expectedResult = {
        id: 1,
        username: 'pmuckloe0',
        email: 'pmuckloe0@hibu.com',
        name: 'Philippine Muckloe',
        description: null,
        avatar: null,
        createdAt: new Date('2025-04-24T06:06:20.172Z'),
        updatedAt: new Date('2025-04-24T06:06:20.172Z'),
      } as User;
      prismaService.user.findUnique.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserOrThrow(id);

      expect(result).toEqual(expectedResult);
      expect(result.id).toBe(id);
    });

    it('should throw error find user by id', async () => {
      const id = 99999;
      prismaService.user.findUnique.mockResolvedValueOnce(null);

      let hasThrown = false;
      let errorResult;
      try {
        await usersService.findUserOrThrow(id);
      } catch (error) {
        hasThrown = true;
        errorResult = error;
      }

      expect(errorResult).toBeInstanceOf(NotFoundException);
      expect(hasThrown).toBe(true);
    });
  });
});
