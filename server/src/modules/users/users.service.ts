import { User } from '@prisma/client';

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
      omit: {
        password: true,
        description: true,
      },
    });

    return users;
  }

  async findUserOrThrow(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: dto,
      omit: {
        password: true,
      },
    });

    return { data: user, message: 'User is successfully created' };
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.findUserOrThrow(id);
    await this.checkOtherUsersWithUsername(id, dto.username);
    await this.checkOtherUsersWithEmail(id, dto.email);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: dto,
      omit: { password: true },
    });

    return { data: updatedUser, message: 'User is successfully updated' };
  }

  private async checkOtherUsersWithUsername(id: number, username: string) {
    const userWithUsername = await this.prismaService.user.findFirst({
      where: {
        id: { not: id },
        username,
      },
    });

    if (userWithUsername) {
      throw new BadRequestException('User with this username is already exists');
    }
  }

  private async checkOtherUsersWithEmail(id: number, email: string) {
    const userWithEmail = await this.prismaService.user.findFirst({
      where: {
        id: { not: id },
        email,
      },
    });

    if (userWithEmail) {
      throw new BadRequestException('User with this email is already exists');
    }
  }
}
