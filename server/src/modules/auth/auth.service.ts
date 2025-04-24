import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create.user.dto';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async registerUser(dto: RegisterUserDto) {
    await this.usersService.checkOtherUsersWithUsername(dto.username);
    await this.usersService.checkOtherUsersWithEmail(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const createUserData: CreateUserDto = {
      ...dto,
      password: hashedPassword,
    };
    const registeredUser = await this.usersService.createUser(createUserData);

    return { data: registeredUser.data, message: 'Registering has been successfully proceed' };
  }
}
