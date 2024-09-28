import { MondayAccountFreeSubscriptionModule } from 'src/monday-account-free-subscription/monday-account-free-subscription.module';
import { Module } from '@nestjs/common';
import { FreeSubscribersController } from './free-subscribers.controller';
import { FreeSubscribersService } from './free-subscribers.service';
import { FreeSubscribersActionHandlerService } from './free-subscribers-action-handler.service';
import { StringsModule } from 'src/utils/strings/strings.module';
import { MondayModule } from 'src/monday/monday.module';

@Module({
  imports: [MondayAccountFreeSubscriptionModule, StringsModule, MondayModule],
  controllers: [FreeSubscribersController],
  providers: [FreeSubscribersService, FreeSubscribersActionHandlerService],
})
export class FreeSubscribersModule {}
