import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewMondayAccountActionsDocument =
  HydratedDocument<NewMondayAccountActions>;

@Schema()
export class NewMondayAccountActions {
  @Prop({ required: true })
  mondayAccountId!: number;

  @Prop({ default: 0 })
  actions!: number;

  @Prop({ required: true })
  actionsCounterStartDate!: Date;

  @Prop({ required: true })
  actionsCounterEndDate!: Date;

  @Prop({ required: true })
  isActive!: boolean;

  @Prop({ required: true })
  month!: string;

  @Prop({ required: true })
  plan_id!: string;

  @Prop({ required: true })
  subscription!: string;

  @Prop({ default: new Date() })
  createdAt!: Date;

  @Prop({ default: new Date() })
  updatedAt!: Date;
}

export const NewMondayAccountACtionsSchema = SchemaFactory.createForClass(
  NewMondayAccountActions,
);
