import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @IsString({ message: 'Invalid username' })
  @Length(3, 30, {
    message:
      'Username must contain at least $constraint1 characters and no more $constraint2 characters',
  })
  readonly username: string;

  @IsString({ message: 'Invalid name' })
  @MinLength(1, { message: 'Name must contain at least $contraint1 characters' })
  readonly name: string;

  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @MinLength(8, { message: 'Password must contain at least $contraint1 characters' })
  readonly password: string;
}
