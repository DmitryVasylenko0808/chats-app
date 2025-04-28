import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';

import { ChatsService } from '../chats/services/chats.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(PrivateAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatsService: ChatsService
  ) {}

  @Get()
  async findUsers(@Query('search') search: string) {
    return await this.usersService.findUsers(search);
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserOrThrow(id);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return await this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }

  @Get(':id/chats')
  async findUserChats(@Param('id', ParseIntPipe) id: number) {
    return await this.chatsService.findChats(id);
  }
}
