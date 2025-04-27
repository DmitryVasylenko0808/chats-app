import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ChatsService } from './modules/chats/services/chats.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // const cs = app.get(ChatsService);
  // await cs.refreshMembersChats([1, 2]);

  await app.listen(configService.get('PORT') || 4444);
}
bootstrap();
