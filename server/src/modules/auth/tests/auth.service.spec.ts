import * as bcrypt from 'bcrypt';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { createMockUser } from '@/common/test-utils/factories/user.factory';

import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { RegisterUserRequestDto, SignInUserRequestDto } from '../dto/requests';
import { AccessTokenPayload } from '../types/access-token-payload';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: DeepMockProxy<UsersService>;
  let jwtService: DeepMockProxy<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockDeep<UsersService>() },
        { provide: JwtService, useValue: mockDeep<JwtService>() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('registerUser', () => {
    const dto: RegisterUserRequestDto = {
      username: 'test-username',
      name: 'test-name',
      password: 'test-password',
      email: 'test-email@mail.com',
    };

    it('should register user', async () => {
      const hashedPassword = 'password-hashed';
      const mockCreateUserResult = createMockUser(4, dto);
      const expectedResult = mockCreateUserResult;
      const bcryptSpy = jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      usersService.verifyUsernameNotTaken.mockResolvedValueOnce();
      usersService.verifyEmailNotTaken.mockResolvedValueOnce();
      usersService.createUser.mockResolvedValueOnce(mockCreateUserResult);

      const result = await authService.registerUser(dto);

      expect(bcryptSpy).toHaveBeenCalledWith(dto.password, 10);
      expect(usersService.createUser).toHaveBeenCalledWith({ ...dto, password: hashedPassword });
      expect(result).toEqual(expectedResult);
    });

    it('should throw error register user (username is already exists)', async () => {
      usersService.verifyUsernameNotTaken.mockRejectedValueOnce(new BadRequestException());

      const registerUser = authService.registerUser(dto);

      expect(registerUser).rejects.toThrow(BadRequestException);
    });

    it('should throw error register user (email is already exists)', async () => {
      usersService.verifyUsernameNotTaken.mockResolvedValueOnce();
      usersService.verifyEmailNotTaken.mockRejectedValueOnce(new BadRequestException());

      const registerUser = authService.registerUser(dto);

      expect(registerUser).rejects.toThrow(BadRequestException);
    });
  });

  describe('signInUser', () => {
    const dto: SignInUserRequestDto = {
      username: 'test-username',
      password: 'test-password',
    };

    it('should sign in user', async () => {
      const mockFoundedUser = createMockUser(1, { password: 'user-password' });
      const mockAccessTokenPayload: AccessTokenPayload = { id: mockFoundedUser.id };
      const expectedResult = { accessToken: 'access-token' };
      usersService.findUserByUsername.mockResolvedValueOnce(mockFoundedUser);
      const bcryptSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);
      const jwtServiceSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(expectedResult.accessToken);

      const result = await authService.signInUser(dto);

      expect(usersService.findUserByUsername).toHaveBeenCalledWith(dto.username);
      expect(bcryptSpy).toHaveBeenCalledWith(dto.password, mockFoundedUser.password);
      expect(jwtServiceSpy).toHaveBeenCalledWith(mockAccessTokenPayload);
      expect(result).toEqual(expectedResult);
    });

    it('should throw error sign in user (invalid username)', async () => {
      usersService.findUserByUsername.mockResolvedValueOnce(null);

      const signInUser = authService.signInUser(dto);

      expect(usersService.findUserByUsername).toHaveBeenCalledWith(dto.username);
      expect(signInUser).rejects.toThrow(BadRequestException);
    });

    it('should throw error sign in user (invalid password)', async () => {
      const mockFoundedUser = createMockUser(1, { password: 'user-password' });
      usersService.findUserByUsername.mockResolvedValueOnce(mockFoundedUser);
      const bcryptSpy = jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      const signInUser = authService.signInUser(dto);

      expect(usersService.findUserByUsername).toHaveBeenCalledWith(dto.username);
      expect(bcryptSpy).toHaveBeenCalledWith(dto.password, mockFoundedUser.password);
      expect(signInUser).rejects.toThrow(BadRequestException);
    });
  });
});
