import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(express.json());

  const config = new DocumentBuilder()
    .setTitle('Сервер по настольным играм')
    .setDescription('Документация к API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  return app.getHttpAdapter().getInstance();
}

module.exports = bootstrap().catch(err => {
  console.error('Failed to start Nest application:', err);
  process.exit(1);
});
