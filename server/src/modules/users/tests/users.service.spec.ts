import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
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
      const expectedResult = [createMockUser(1), createMockUser(2)];
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
      const expectedResult = createMockUser(1);
      prismaService.user.findUnique.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserOrThrow(id);

      expect(result).toEqual(expectedResult);
      expect(result.id).toBe(id);
    });

    it('should throw error find user by id', async () => {
      const id = 99999;
      prismaService.user.findUnique.mockResolvedValueOnce(null);

      const findUserOrThrow = usersService.findUserOrThrow(id);

      await expect(findUserOrThrow).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUserByUsername', () => {
    const mockUsername = 'test-username';

    it('should find user by username', async () => {
      const expectedResult = createMockUser(1);
      prismaService.user.findUnique.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserByUsername(mockUsername);

      expect(prismaService.user.findUnique).toHaveBeenCalled();
      expect(result).toBeTruthy();
      expect(result).toEqual(expectedResult);
    });

    it('should not find user by username', async () => {
      const expectedResult = null;
      prismaService.user.findUnique.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserByUsername(mockUsername);

      expect(prismaService.user.findUnique).toHaveBeenCalled();
      expect(result).toBeFalsy();
      expect(result).toBe(expectedResult);
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const dto: CreateUserDto = {
        username: 'test-username',
        name: 'test-name',
        email: 'test-email@mail.com',
        password: 'test-password',
      };
      const expectedResult = createMockUser(4);
      prismaService.user.create.mockResolvedValueOnce(expectedResult);

      const result = await usersService.createUser(dto);

      expect(result).toBeTruthy();
      expect(result).toEqual(expectedResult);
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
      const expectedResult = createMockUser(1, dto);
      prismaService.user.findUnique.mockResolvedValueOnce(expectedResult);
      prismaService.user.findFirst.mockResolvedValue(null);
      prismaService.user.update.mockResolvedValueOnce(expectedResult);

      const result = await usersService.updateUser(id, dto);

      expect(result).toBeTruthy();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error update user (not found)', async () => {
      const id = 9999;
      prismaService.user.findUnique.mockResolvedValueOnce(null);

      const updateUser = usersService.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(NotFoundException);
    });

    it('should throw error update user (username is already exists)', async () => {
      prismaService.user.findUnique.mockResolvedValueOnce({ id: 1 } as User);
      prismaService.user.findFirst.mockResolvedValueOnce({ id: 10 } as User);

      const updateUser = usersService.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(BadRequestException);
    });

    it('should throw error update user (email is already exists)', async () => {
      prismaService.user.findUnique.mockResolvedValueOnce({ id: 1 } as User);
      prismaService.user.findFirst.mockResolvedValueOnce(null);
      prismaService.user.findFirst.mockResolvedValueOnce({ id: 10 } as User);

      const updateUser = usersService.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      const id = 1;
      const expectedResult = createMockUser(id);
      prismaService.user.findUnique.mockResolvedValueOnce(expectedResult);
      prismaService.user.delete.mockResolvedValue(expectedResult);

      const result = await usersService.deleteUser(id);

      expect(result).toBeTruthy();
      expect(result).toBe(expectedResult);
    });

    it('should throw error delete user by id (user not found)', async () => {
      const id = 9999;
      prismaService.user.findUnique.mockResolvedValueOnce(null);

      const deleteUser = usersService.deleteUser(id);

      await expect(deleteUser).rejects.toThrow(NotFoundException);
    });
  });
});
