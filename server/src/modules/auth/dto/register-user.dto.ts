import { IsEmail, IsEmpty, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Invalid username' })
  @Length(3, 30, {
    message:
      'Username must contain at least $constraint1 characters and no more $constraint2 characters',
  })
  readonly username: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Invalid name' })
  @MinLength(1, { message: 'Name must contain at least $constraint1 characters' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must contain at least $constraint1 characters' })
  readonly password: string;
}
