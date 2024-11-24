import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MondayModule } from './monday/monday.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SessionLoggingInterceptor } from './interceptors/session-logging.interceptor';
import { AppExceptionFilter } from './filters/app-exception.filter';
import { AppEventsModule } from './app-events/app-events.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { MondayAccountFreeSubscriptionModule } from './schemas/monday-account-free-subscription/monday-account-free-subscription.module';
import { NewMondayAccountActionsModule } from './schemas/new-monday-account-actions/new-monday-account-actions.module';
import { DatabaseModule } from './config/database.module';

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
    DatabaseModule.forRootAsync(),
    MondayAccountFreeSubscriptionModule,
    NewMondayAccountActionsModule,
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
