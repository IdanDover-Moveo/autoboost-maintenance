import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MondayAccountFreeSubscriptionDocument =
  HydratedDocument<MondayAccountFreeSubscription>;

@Schema()
export class MondayAccountFreeSubscription {
  @Prop({ required: true })
  mondayAccountId!: number;
}

export const MondayAccountFreeSubscriptionSchema = SchemaFactory.createForClass(
  MondayAccountFreeSubscription,
);
