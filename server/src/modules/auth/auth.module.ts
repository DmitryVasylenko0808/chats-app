import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtRegisterOptions } from './utils/jwt-register-options';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtRegisterOptions)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
