import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PrivateAuthGuard } from '@/common/guards/private-auth.guard';
import { multerOptions } from '@/common/storage/multer.config';

import { UpdateUserRequestDto } from './dto/requests';
import { UserGroup, UserResponseDto } from './dto/responses/user.response.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(PrivateAuthGuard)
@SerializeOptions({ groups: [UserGroup.USER_DETAILS] })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SerializeOptions({ groups: [] })
  async findUsers(@Query('search') search: string): Promise<UserResponseDto[]> {
    const users = await this.usersService.findUsers(search);
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserOrThrow(id);
    return new UserResponseDto(user);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRequestDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    const user = await this.usersService.updateUser(id, dto, avatarFile?.filename);
    return new UserResponseDto(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.deleteUser(id);
    return new UserResponseDto(user);
  }
}
