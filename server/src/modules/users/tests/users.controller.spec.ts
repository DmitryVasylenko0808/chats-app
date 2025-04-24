import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: DeepMockProxy<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockDeep<UsersService>() }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findUsers', () => {
    it('return users by search value', async () => {
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
      usersService.findUsers.mockResolvedValueOnce(expectedResult);

      const result = await usersController.findUsers(search);

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(expectedResult.length);
    });

    it('should not find users by search value', async () => {
      const expectedResult = [];
      usersService.findUsers.mockResolvedValueOnce(expectedResult);

      const result = await usersController.findUsers('abc');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });

    it('should not find users by empty search value', async () => {
      const expectedResult = [];
      usersService.findUsers.mockResolvedValueOnce(expectedResult);

      const result = await usersController.findUsers('');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });
  });

  describe('findUser', () => {
    it('should return user by id', async () => {
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
      usersService.findUserOrThrow.mockResolvedValueOnce(expectedResult);

      const result = await usersController.findUser(id);

      expect(result).toEqual(expectedResult);
      expect(result.id).toBe(id);
    });

    it('should throw error return user by id', async () => {
      const id = 99999;
      usersService.findUserOrThrow.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      let hasThrown = false;
      let errorResult;
      try {
        await usersController.findUser(id);
      } catch (error) {
        hasThrown = true;
        errorResult = error;
      }

      expect(errorResult).toBeInstanceOf(NotFoundException);
      expect(hasThrown).toBe(true);
    });
  });
});
