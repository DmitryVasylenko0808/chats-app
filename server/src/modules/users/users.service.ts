import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

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

    const mappedUsers = users.map((u) => ({
      ...u,
      avatar: `${this.configService.get('SERVER_AVATARS_URL')}/${u.avatar}`,
    }));

    return mappedUsers;
  }

  async findUserOrThrow(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    user.avatar = `${this.configService.get('SERVER_AVATARS_URL')}/${user.avatar}`;

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
      data: dto,
      omit: {
        password: true,
      },
    });

    user.avatar = `${this.configService.get('SERVER_AVATARS_URL')}/${user.avatar}`;

    return { data: user, message: 'User is successfully created' };
  }

  async updateUser(id: number, dto: UpdateUserDto, avatar?: string) {
    await this.findUserOrThrow(id);
    await this.checkOtherUsersWithUsername(dto.username, id);
    await this.checkOtherUsersWithEmail(dto.email, id);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...dto,
        avatar,
      },
      omit: { password: true },
    });

    updatedUser.avatar = `${this.configService.get('SERVER_AVATARS_URL')}/${updatedUser.avatar}`;

    return { data: updatedUser, message: 'User is successfully updated' };
  }

  async deleteUser(id: number) {
    await this.findUserOrThrow(id);

    await this.prismaService.user.delete({
      where: { id },
    });

    return { message: 'User is successfully deleted' };
  }

  async checkOtherUsersWithUsername(username: string, exceptUserId?: number) {
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

  async checkOtherUsersWithEmail(email: string, exceptUserId?: number) {
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
