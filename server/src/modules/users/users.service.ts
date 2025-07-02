import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserRequestDto, UpdateUserRequestDto } from './dto/requests';
import { UsersRepository } from './users-repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findUsers(search?: string) {
    if (!search) {
      return [];
    }

    return await this.usersRepository.findManyBySearch(search);
  }

  async findUserOrThrow(id: number) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async findUserByUsername(username: string) {
    return await this.usersRepository.findOneByUsername(username);
  }

  async createUser(dto: CreateUserRequestDto) {
    return await this.usersRepository.create(dto);
  }

  async updateUser(id: number, dto: UpdateUserRequestDto, avatar?: string) {
    await this.findUserOrThrow(id);
    await this.verifyUsernameNotTaken(dto.username, id);
    await this.verifyEmailNotTaken(dto.email, id);

    return await this.usersRepository.update(id, dto, avatar);
  }

  async deleteUser(id: number) {
    await this.findUserOrThrow(id);

    return await this.usersRepository.delete(id);
  }

  async verifyUsernameNotTaken(username: string, exceptUserId?: number) {
    const userWithUsername = await this.usersRepository.findOneByUsernameExcludingId(
      username,
      exceptUserId
    );

    if (userWithUsername) {
      throw new BadRequestException('User with this username is already exists');
    }
  }

  async verifyEmailNotTaken(email: string, exceptUserId?: number) {
    const userWithEmail = await this.usersRepository.findOneByEmalExcludingId(email, exceptUserId);

    if (userWithEmail) {
      throw new BadRequestException('User with this email is already exists');
    }
  }
}
