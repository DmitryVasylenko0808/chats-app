import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { UsersService } from '@/modules/users/users.service';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { RegisterUserRequestDto, SignInUserRequestDto } from '../dto/requests';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: DeepMockProxy<AuthService>;
  let usersService: DeepMockProxy<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockDeep<AuthService>() },
        { provide: UsersService, useValue: mockDeep<UsersService>() },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('registerUser', () => {
    const dto: RegisterUserRequestDto = {
      username: 'test-username',
      name: 'test-name',
      password: 'test-password',
      email: 'test-email@mail.com',
    };

    it('should register user', async () => {
      const expectedResult = createMockUser(1, { ...dto });
      authService.registerUser.mockResolvedValueOnce(expectedResult);

      const result = await authController.registerUser(dto);

      expect(authService.registerUser).toHaveBeenCalled();
      expect(authService.registerUser).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw error register user (username is already exists)', async () => {
      authService.registerUser.mockRejectedValueOnce(new BadRequestException());

      const registerUser = authController.registerUser(dto);

      expect(authService.registerUser).toHaveBeenCalled();
      expect(authService.registerUser).toHaveBeenCalledWith(dto);
      expect(registerUser).rejects.toThrow(BadRequestException);
    });

    it('should throw error register user (username is already exists)', async () => {
      authService.registerUser.mockRejectedValueOnce(new BadRequestException());

      const registerUser = authController.registerUser(dto);

      expect(authService.registerUser).toHaveBeenCalled();
      expect(authService.registerUser).toHaveBeenCalledWith(dto);
      expect(registerUser).rejects.toThrow(BadRequestException);
    });
  });

  describe('signInUser', () => {
    const dto: SignInUserRequestDto = {
      username: 'test-username',
      password: 'test-password',
    };

    it('should sign in user', async () => {
      const expectedResult = { accessToken: 'access-token' };
      authService.signInUser.mockResolvedValueOnce(expectedResult);

      const result = await authController.signInUser(dto);

      expect(authService.signInUser).toHaveBeenCalled();
      expect(authService.signInUser).toHaveBeenCalledWith(dto);
      expect(result).toBe(expectedResult);
    });

    it('should not sign in user', async () => {
      authService.signInUser.mockRejectedValueOnce(new BadRequestException());

      const signInUser = authController.signInUser(dto);

      expect(authService.signInUser).toHaveBeenCalled();
      expect(authService.signInUser).toHaveBeenCalledWith(dto);
      expect(signInUser).rejects.toThrow(BadRequestException);
    });
  });
});
