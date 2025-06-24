import { EntityType } from '@prisma/client';

import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Expose, Transform, Type } from 'class-transformer';

export class NotificationQueryDto {
  @IsOptional()
  @IsBoolean()
  @Expose({ name: 'is_read' })
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : undefined))
  readonly isRead?: boolean;

  @IsOptional()
  @IsEnum(EntityType)
  @Expose({ name: 'entity_type' })
  readonly entityType?: EntityType;

  @IsOptional()
  @Expose({ name: 'sort_date' })
  readonly sortDate?: 'asc' | 'desc';

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'page' })
  @Type(() => Number)
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'limit' })
  @Type(() => Number)
  readonly limit?: number;
}
