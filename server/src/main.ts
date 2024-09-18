import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvDefinition } from './shared/env-definition';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvDefinition>);

  const config = new DocumentBuilder()
    .setTitle('JsChat api')
    .setDescription('JsChat backen server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
