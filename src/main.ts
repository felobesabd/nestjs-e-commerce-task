import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./exception-filter/http-exception-filter";
import { I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );

  app.use(cors())

  app.useGlobalFilters(new I18nValidationExceptionFilter({ detailedErrors: true }))

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  await app.listen(port);
}

bootstrap();
