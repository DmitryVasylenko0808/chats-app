import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignInUserDto } from './dto/sing-in.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    return await this.authService.registerUser(dto);
  }

  @Post('sign-in')
  async signInUser(@Body() dto: SignInUserDto) {
    return await this.authService.signInUser(dto);
  }
}
