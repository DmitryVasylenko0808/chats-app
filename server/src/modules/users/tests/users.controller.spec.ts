import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

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

      const result = await usersService.findUsers(search);

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(expectedResult.length);
    });

    it('should not find users by search value', async () => {
      const expectedResult = [];
      usersService.findUsers.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers('abc');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });

    it('should not find users by empty search value', async () => {
      const expectedResult = [];
      usersService.findUsers.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers('');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });
  });
});
