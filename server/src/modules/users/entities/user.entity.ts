import { User } from '@prisma/client';

import { Exclude, Expose, Transform } from 'class-transformer';

export enum UserGroup {
  USER_DETAILS = 'user_details',
}

export class UserEntity implements User {
  id: number;

  name: string;

  username: string;

  @Exclude()
  password: string;

  email: string;

  @Expose({ groups: [UserGroup.USER_DETAILS] })
  description: string | null;

  @Transform(({ value }) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  avatar: string | null;

  createdAt: Date;

  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
