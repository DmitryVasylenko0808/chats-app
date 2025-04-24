import { User } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private users: User[];

  constructor(private readonly prismaService: PrismaService) {
    this.users = [
      {
        id: 1,
        username: 'pmuckloe0',
        password: '$2b$10$mWLiWTDBAD27FJU8GMScl.IT.SxJZNsn2TP/tuKoEFifQ5jQ16RXa',
        email: 'pmuckloe0@adobe.com',
        name: 'Philippine Muckloe',
        avatar: null,
        description: null,
        createdAt: new Date('2025-04-24T06:06:20.172Z'),
        updatedAt: new Date('2025-04-24T06:06:20.172Z'),
      },
      {
        id: 2,
        username: 'shighway1',
        password: '$2b$10$yNOboj2vhKw2HSoM.0LrW.nWrCpIZWPF7sHebf4s9T7ONyJxIJCpK',
        email: 'shighway1@people.com.cn',
        name: 'Suzette Highway',
        avatar: null,
        description: null,
        createdAt: new Date('2025-04-24T06:06:20.172Z'),
        updatedAt: new Date('2025-04-24T06:06:20.172Z'),
      },
      {
        id: 3,
        username: 'lbroek2',
        email: 'lbroek2@hibu.com',
        password: '$2b$10$MvMRS2nzmN9Cdr/8/Ob/aeBmP/a76y6Cift2HUXa5rKIDkq/nWDXK',
        name: 'Lilli Broek',
        avatar: null,
        description: null,
        createdAt: new Date('2025-04-24T06:06:20.172Z'),
        updatedAt: new Date('2025-04-24T06:06:20.172Z'),
      },
    ];
  }

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
}
