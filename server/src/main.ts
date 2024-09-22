import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvDefinition } from './shared/env-definition';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SocketIOAPIDefinition } from './shared/socket-io-api-definition';
import { RedisIoAdapter } from './shared/redis-io-adapter';
import { RedisService } from './redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvDefinition>);
  const redisService = app.get(RedisService);

  app.enableCors({
    origin: [configService.getOrThrow<string>('WEB_CLIENT_URL')],
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('JsChat api')
    .setDescription('JsChat backen server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SocketIOAPIDefinition],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
