import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UpdateUserDto } from '../dto/update.user.dto';
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

      const findUser = usersController.findUser(id);

      await expect(findUser).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUser', () => {
    const id = 1;
    const dto: UpdateUserDto = {
      name: 'test-name',
      username: 'test-username',
      description: 'test-description',
      email: 'test-email@mail.com',
    };

    it('should update user', async () => {
      const expectedResult = {
        data: {
          id,
          ...dto,
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User,
        messsage: 'User is successfully updated',
      };
      usersService.updateUser.mockResolvedValueOnce({
        data: expectedResult.data,
        message: expectedResult.messsage,
      });

      const result = await usersController.updateUser(id, dto);

      expect(result).toBeTruthy();
      expect(result.data).toEqual(expectedResult.data);
      expect(result.message).toBe(expectedResult.messsage);
    });

    it('should throw error update user (not found)', async () => {
      const id = 9999;
      usersService.updateUser.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      const updateUser = usersController.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(NotFoundException);
    });

    it('should throw error update user (username is already exists)', async () => {
      usersService.updateUser.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      const updateUser = usersController.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(BadRequestException);
    });

    it('should throw error update user (email is already exists)', async () => {
      usersService.updateUser.mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      const updateUser = usersController.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      const id = 1;
      const expectedResult = { message: 'User is successfully deleted' };
      usersService.deleteUser.mockResolvedValue(expectedResult);

      const result = await usersController.deleteUser(id);

      expect(result).toBeTruthy();
      expect(result.message).toBe(expectedResult.message);
    });

    it('should throw error delete user by id (user not found)', async () => {
      const id = 9999;
      usersService.deleteUser.mockImplementationOnce(() => {
        throw new NotFoundException();
      });

      const deleteUser = usersController.deleteUser(id);

      await expect(deleteUser).rejects.toThrow(NotFoundException);
    });
  });
});
