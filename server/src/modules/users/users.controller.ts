import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';
import { multerOptions } from '@/common/storage/multer.config';

import { ChatsService } from '../chats/chats.service';
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
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    return await this.usersService.updateUser(id, dto, avatarFile?.filename);
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
