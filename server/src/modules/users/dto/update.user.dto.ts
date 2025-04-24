import { IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Invalid username' })
  @Length(3, 30, {
    message:
      'Username must contain at least $constraint1 characters and no more $constraint2 characters',
  })
  readonly username?: string;

  @IsOptional()
  @IsString({ message: 'Invalid name' })
  @MinLength(1, { message: 'Name must contain at least $contraint1 characters' })
  readonly name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  readonly email?: string;

  @IsOptional()
  readonly description?: string;
}
