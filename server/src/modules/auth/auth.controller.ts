import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { SignInUserDto } from './dto/sing-in.user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    return await this.authService.registerUser(dto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signInUser(@Body() dto: SignInUserDto) {
    return await this.authService.signInUser(dto);
  }

  @Get('me')
  @UseGuards(PrivateAuthGuard)
  async getMe(@CurrentUser('id') id: number) {
    return await this.userService.findUserOrThrow(id);
  }
}
