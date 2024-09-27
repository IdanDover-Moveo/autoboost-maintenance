import { MondayAccountFreeSubscriptionModule } from 'src/monday-account-free-subscription/monday-account-free-subscription.module';
import { Module } from '@nestjs/common';
import { FreeSubscribersController } from './free-subscribers.controller';
import { FreeSubscribersService } from './free-subscribers.service';
import { FreeSubscribersActionHandler } from './free-subscribers-action.handler';

@Module({
  imports: [MondayAccountFreeSubscriptionModule],
  controllers: [FreeSubscribersController],
  providers: [FreeSubscribersService, FreeSubscribersActionHandler],
})
export class FreeSubscribersModule {}
