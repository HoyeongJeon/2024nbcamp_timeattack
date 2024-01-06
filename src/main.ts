import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as fs from 'fs';
import { SRC_PATH } from './common/const/path.const';
import { HttpExceptionFilter } from './common/exeption-filter/http.exception-filter';
import { CORS_CONFIG } from './config/cors.config';

async function bootstrap() {
  // https 설정
  const httpsOptions = {
    key: fs.readFileSync(SRC_PATH + '/secrets/private-key.pem'),
    cert: fs.readFileSync(SRC_PATH + '/secrets/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get<number>('SERVER_PORT');

  // helmet 보안 설정
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  // cors 설정
  app.enableCors(CORS_CONFIG);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 타입 변환.
      whitelist: true, // decorator가 없는 속성 제거
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(SERVER_PORT);
}
bootstrap();
