import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NewMondayAccountActions,
  NewMondayAccountACtionsSchema,
} from './new-monday-account-actions.schema';
import { NewMondayAccountActionsService } from './new-monday-account-actions.service';
import { NewMondayAccountActionsController } from './new-monday-account-actions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NewMondayAccountActions.name,
        schema: NewMondayAccountACtionsSchema,
      },
    ]),
  ],
  providers: [NewMondayAccountActionsService],
  exports: [NewMondayAccountActionsService],
  controllers: [NewMondayAccountActionsController],
})
export class NewMondayAccountActionsModule {}
