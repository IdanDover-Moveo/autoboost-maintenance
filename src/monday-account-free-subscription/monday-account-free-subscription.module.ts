import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MondayAccountFreeSubscriptionService } from './monday-account-free-subscription.service';
import {
  MondayAccountFreeSubscription,
  MondayAccountFreeSubscriptionSchema,
} from 'src/schemas/monday-account-free-subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MondayAccountFreeSubscription.name,
        schema: MondayAccountFreeSubscriptionSchema,
      },
    ]),
  ],
  providers: [MondayAccountFreeSubscriptionService],
  exports: [MondayAccountFreeSubscriptionService],
})
export class MondayAccountFreeSubscriptionModule {}
