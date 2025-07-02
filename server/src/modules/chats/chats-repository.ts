import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateChatRequestDto } from './dto/requests';
import { IChatsRepository } from './interfaces/chats-repository.interface';
import { ChatPreview, ChatWithMembers } from './types';

@Injectable()
export class ChatsRepository implements IChatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: number): Promise<ChatPreview[]> {
    return await this.prisma.chat.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async findOneById(id: number): Promise<ChatWithMembers | null> {
    return await this.prisma.chat.findUnique({
      where: { id },
      include: { members: true },
    });
  }

  async findExistingChatBetweenUsers(usersIds: number[]): Promise<ChatWithMembers | null> {
    const [firstUserId, secondUserId] = usersIds;

    return await this.prisma.chat.findFirst({
      where: {
        AND: [
          {
            members: {
              some: { id: firstUserId },
            },
          },
          {
            members: {
              some: { id: secondUserId },
            },
          },
        ],
      },
      include: { members: true },
    });
  }

  async findChatsByMemberIds(membersIds: number[]): Promise<ChatPreview[]> {
    return await this.prisma.chat.findMany({
      where: {
        members: {
          some: {
            id: { in: membersIds },
          },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async create(data: CreateChatRequestDto): Promise<ChatWithMembers> {
    return await this.prisma.chat.create({
      data: {
        members: {
          connect: data.membersIds.map((m) => ({ id: m })),
        },
      },
      include: { members: true },
    });
  }

  async delete(id: number): Promise<ChatWithMembers> {
    return await this.prisma.chat.delete({
      where: { id },
      include: { members: true },
    });
  }
}
