import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error'] : ['verbose'],
  });

  //NOTE: Security middleware
  app.use(helmet());

  //NOTE: Put your domains which you want to allow the access
  app.enableCors();
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
