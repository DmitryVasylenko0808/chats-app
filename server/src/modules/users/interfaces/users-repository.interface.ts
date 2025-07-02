import { User } from '@prisma/client';

import { CreateUserRequestDto, UpdateUserRequestDto } from '../dto/requests';

export interface IUsersRepository {
  findManyBySearch(search?: string): Promise<User[]>;
  findOneById(id: number): Promise<User | null>;
  findOneByUsername(username: string): Promise<User | null>;
  create(data: CreateUserRequestDto): Promise<User>;
  update(id: number, data: UpdateUserRequestDto, avatar?: string): Promise<User>;
  delete(id: number): Promise<User>;
  findOneByUsernameExcludingId(username: string, id: number): Promise<User | null>;
  findOneByEmalExcludingId(email: string, id: number): Promise<User | null>;
}
