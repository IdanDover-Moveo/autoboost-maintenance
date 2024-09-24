import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MondayModule } from './monday/monday.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SessionLoggingInterceptor } from './interceptors/session-logging.interceptor';
import { AppExceptionFilter } from './filters/app-exception.filter';
import { AppEventsModule } from './app-events/app-events.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MondayModule,
    AuthModule,
    AppEventsModule,
    IntegrationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SessionLoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
