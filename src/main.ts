import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });

  app.setGlobalPrefix('api');

  app
    .getHttpAdapter()
    .getInstance()
    .get('/', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });

  // Middleware
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('Сервер по настольным играм')
    .setDescription('Документация к API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Запуск сервера
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);

  return app;
}

bootstrap();
