import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUsers(search?: string) {
    if (!search) {
      return [];
    }

    const users = await this.prismaService.user.findMany({
      where: {
        username: {
          startsWith: search,
          mode: 'insensitive',
        },
      },
    });

    return users;
  }

  async findUserOrThrow(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async findUserByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        avatar: 'placeholder.jpg',
        ...dto,
      },
    });

    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto, avatar?: string) {
    await this.findUserOrThrow(id);
    await this.verifyUsernameNotTaken(dto.username, id);
    await this.verifyEmailNotTaken(dto.email, id);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...dto,
        avatar,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    await this.findUserOrThrow(id);

    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });

    return deletedUser;
  }

  async verifyUsernameNotTaken(username: string, exceptUserId?: number) {
    const userWithUsername = await this.prismaService.user.findFirst({
      where: {
        id: { not: exceptUserId },
        username,
      },
    });

    if (userWithUsername) {
      throw new BadRequestException('User with this username is already exists');
    }
  }

  async verifyEmailNotTaken(email: string, exceptUserId?: number) {
    const userWithEmail = await this.prismaService.user.findFirst({
      where: {
        id: { not: exceptUserId },
        email,
      },
    });

    if (userWithEmail) {
      throw new BadRequestException('User with this email is already exists');
    }
  }
}
