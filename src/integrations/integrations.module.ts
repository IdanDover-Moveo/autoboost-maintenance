import { Module } from '@nestjs/common';
import { MondayModule } from 'src/monday/monday.module';
import { FreeSubscribersModule } from './free-subscribers/free-subscribers.module';
import { IntegrationsAuthController } from './integrations-auth.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MondayModule, FreeSubscribersModule],
  controllers: [IntegrationsAuthController],
})
export class IntegrationsModule {}
