import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExceptionHandler } from '@exceptions/exception.handler';

const origin = ['http://localhost:3000', 'http://localhost:3006'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionHandler());
  app.enableCors({ origin, methods: 'POST,GET,PATCH,PUT,DELETE,OPTIONS' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
