import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@/common/decorators/current-user.descorator';
import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { UserGroup, UserResponseDto } from '../users/dto/responses';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterUserRequestDto, SignInUserRequestDto } from './dto/requests';
import { SignInResponseDto } from './dto/responses';

@Controller('auth')
@SerializeOptions({ groups: [UserGroup.USER_DETAILS] })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterUserRequestDto) {
    const user = await this.authService.registerUser(dto);
    return new UserResponseDto(user);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signInUser(@Body() dto: SignInUserRequestDto) {
    const data = await this.authService.signInUser(dto);
    return new SignInResponseDto(data);
  }

  @Get('me')
  @UseGuards(PrivateAuthGuard)
  async getMe(@CurrentUser('id') id: number) {
    const user = await this.userService.findUserOrThrow(id);
    return new UserResponseDto(user);
  }
}
