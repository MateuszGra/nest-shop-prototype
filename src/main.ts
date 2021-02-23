import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from "./filters/glibal-exception.filter";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
      new ValidationPipe({
          disableErrorMessages: true,

          whitelist: true,
          forbidNonWhitelisted: true,

          transform: true,
          transformOptions: {
              enableImplicitConversion: true,
          },
      }),
  );

  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
