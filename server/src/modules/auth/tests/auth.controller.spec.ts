import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: DeepMockProxy<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockDeep<AuthService>() }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('registerUser', () => {
    const dto: RegisterUserDto = {
      username: 'test-username',
      name: 'test-name',
      password: 'test-password',
      email: 'test-email@mail.com',
    };

    it('should register user', async () => {
      const expectedResult = {
        data: {
          name: dto.name,
          username: dto.username,
          email: dto.email,
          id: 1,
          description: null,
          avatar: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        message: 'Registering has been successfully proceed',
      };
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
});
