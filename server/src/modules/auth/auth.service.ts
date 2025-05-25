import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../users/dto/create.user.dto';
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
    await this.usersService.checkOtherUsersWithUsername(dto.username);
    await this.usersService.checkOtherUsersWithEmail(dto.email);

    const registeredUser = await this.usersService.createUser({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    return registeredUser;
  }

  async signInUser(dto: SignInUserDto) {
    const user = await this.usersService.findUserByUsername(dto.username);

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const isValidPass = await bcrypt.compare(dto.password, user.password);

    if (!isValidPass) {
      throw new BadRequestException('Invalid username or password');
    }

    const tokenPayload: AccessTokenPayload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken };
  }
}
