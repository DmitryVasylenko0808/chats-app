import { User } from '@prisma/client';

import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

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
}
