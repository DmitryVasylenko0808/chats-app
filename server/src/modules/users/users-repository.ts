import { User } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from './dto/requests';
import { IUsersRepository } from './interfaces/users-repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyBySearch(search?: string): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        username: {
          startsWith: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { username },
    });
  }

  async create(data: CreateUserRequestDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        avatar: 'placeholder.jpg',
        ...data,
      },
    });
  }

  async update(id: number, data: UpdateUserRequestDto, avatar?: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        avatar,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async findOneByUsernameExcludingId(username: string, id: number): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: { not: id },
        username,
      },
    });
  }

  async findOneByEmalExcludingId(email: string, id: number): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: { not: id },
        email,
      },
    });
  }
}
