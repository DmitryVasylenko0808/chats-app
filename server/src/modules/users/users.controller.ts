import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUsers(@Query('search') search: string) {
    return await this.usersService.findUsers(search);
  }

  @Get(':id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findUserOrThrow(id);
  }
}
