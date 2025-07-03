import { User } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { PrismaService } from '@/modules/prisma/prisma.service';

import { CreateUserRequestDto, UpdateUserRequestDto } from '../dto/requests';
import { UsersRepository } from '../users-repository';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: DeepMockProxy<UsersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockDeep<UsersRepository>() },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findUsers', () => {
    it('should find users by search value', async () => {
      const expectedResult = [createMockUser(1), createMockUser(2)];
      const search = 'lbroe';
      usersRepository.findManyBySearch.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers(search);

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(expectedResult.length);
    });

    it('should not find users by search value', async () => {
      const expectedResult = [];
      usersRepository.findManyBySearch.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers('abc');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });

    it('should not find users by empty search value', async () => {
      const expectedResult = [];
      usersRepository.findManyBySearch.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUsers('');

      expect(result).toEqual(expectedResult);
      expect(result).toHaveLength(0);
    });
  });

  describe('findUserOrThrow', () => {
    it('should find user by id', async () => {
      const id = 1;
      const expectedResult = createMockUser(1);
      usersRepository.findOneById.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserOrThrow(id);

      expect(result).toEqual(expectedResult);
      expect(result.id).toBe(id);
    });

    it('should throw error find user by id', async () => {
      const id = 99999;
      usersRepository.findOneById.mockResolvedValueOnce(null);

      const findUserOrThrow = usersService.findUserOrThrow(id);

      await expect(findUserOrThrow).rejects.toThrow(NotFoundException);
    });
  });

  describe('findUserByUsername', () => {
    const mockUsername = 'test-username';

    it('should find user by username', async () => {
      const expectedResult = createMockUser(1);
      usersRepository.findOneByUsername.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserByUsername(mockUsername);

      expect(usersRepository.findOneByUsername).toHaveBeenCalled();
      expect(result).toBeTruthy();
      expect(result).toEqual(expectedResult);
    });

    it('should not find user by username', async () => {
      const expectedResult = null;
      usersRepository.findOneByUsername.mockResolvedValueOnce(expectedResult);

      const result = await usersService.findUserByUsername(mockUsername);

      expect(usersRepository.findOneByUsername).toHaveBeenCalled();
      expect(result).toBeFalsy();
      expect(result).toBe(expectedResult);
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const dto: CreateUserRequestDto = {
        username: 'test-username',
        name: 'test-name',
        email: 'test-email@mail.com',
        password: 'test-password',
      };
      const expectedResult = createMockUser(4);
      usersRepository.create.mockResolvedValueOnce(expectedResult);

      const result = await usersService.createUser(dto);

      expect(result).toBeTruthy();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateUser', () => {
    const id = 1;
    const dto: UpdateUserRequestDto = {
      name: 'test-name',
      username: 'test-username',
      description: 'test-description',
      email: 'test-email@mail.com',
    };

    it('should update user', async () => {
      const expectedResult = createMockUser(1, dto);
      usersRepository.findOneById.mockResolvedValueOnce(expectedResult);
      usersRepository.findOneByUsernameExcludingId.mockResolvedValueOnce(null);
      usersRepository.findOneByEmalExcludingId.mockResolvedValueOnce(null);
      usersRepository.update.mockResolvedValueOnce(expectedResult);

      const result = await usersService.updateUser(id, dto);

      expect(result).toBeTruthy();
      expect(result).toEqual(expectedResult);
    });

    it('should throw error update user (not found)', async () => {
      const id = 9999;
      usersRepository.findOneById.mockResolvedValueOnce(null);

      const updateUser = usersService.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(NotFoundException);
    });

    it('should throw error update user (username is already exists)', async () => {
      usersRepository.findOneById.mockResolvedValueOnce({ id: 1 } as User);
      usersRepository.findOneByUsernameExcludingId.mockResolvedValueOnce({ id: 10 } as User);

      const updateUser = usersService.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(BadRequestException);
    });

    it('should throw error update user (email is already exists)', async () => {
      usersRepository.findOneById.mockResolvedValueOnce({ id: 1 } as User);
      usersRepository.findOneByUsernameExcludingId.mockResolvedValueOnce(null);
      usersRepository.findOneByEmalExcludingId.mockResolvedValueOnce({ id: 10 } as User);

      const updateUser = usersService.updateUser(id, dto);

      await expect(updateUser).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', async () => {
      const id = 1;
      const expectedResult = createMockUser(id);
      usersRepository.findOneById.mockResolvedValueOnce(expectedResult);
      usersRepository.delete.mockResolvedValueOnce(expectedResult);

      const result = await usersService.deleteUser(id);

      expect(result).toBeTruthy();
      expect(result).toBe(expectedResult);
    });

    it('should throw error delete user by id (user not found)', async () => {
      const id = 9999;
      usersRepository.findOneById.mockResolvedValueOnce(null);

      const deleteUser = usersService.deleteUser(id);

      await expect(deleteUser).rejects.toThrow(NotFoundException);
    });
  });
});
