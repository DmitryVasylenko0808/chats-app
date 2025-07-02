import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignInUserDto } from './dto/sing-in.user.dto';
import { AccessTokenPayload } from './types/access-token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(dto: RegisterUserDto) {
    await this.usersService.verifyUsernameNotTaken(dto.username);
    await this.usersService.verifyEmailNotTaken(dto.email);

    const registeredUser = await this.usersService.createUser({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    return registeredUser;
  }

  async signInUser(dto: SignInUserDto) {
    const { username, password } = dto;

    const user = await this.validateUser(username, password);

    return await this.generateAccessToken(user);
  }

  private async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      throw new BadRequestException('Invalid username or password');
    }

    return user;
  }

  private async generateAccessToken(user: User) {
    const tokenPayload: AccessTokenPayload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken };
  }
}
