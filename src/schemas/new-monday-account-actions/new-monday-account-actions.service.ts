import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewMondayAccountActions } from './new-monday-account-actions.schema';

@Injectable()
export class NewMondayAccountActionsService {
  constructor(
    @InjectModel(NewMondayAccountActions.name)
    private readonly mndyFreeSubscriptionModel: Model<NewMondayAccountActions>,
  ) {}

  async create(
    createFreeSubscription: NewMondayAccountActions,
  ): Promise<NewMondayAccountActions> {
    const createdFreeSubscription = new this.mndyFreeSubscriptionModel(
      createFreeSubscription,
    );
    return createdFreeSubscription.save();
  }

  async findAll(): Promise<NewMondayAccountActions[]> {
    return this.mndyFreeSubscriptionModel.find().exec();
  }

  async findOne(
    mondayAccountId: number,
  ): Promise<NewMondayAccountActions | null> {
    return this.mndyFreeSubscriptionModel.findOne({ mondayAccountId }).exec();
  }

  async find(query: object): Promise<NewMondayAccountActions | null> {
    return this.mndyFreeSubscriptionModel.findOne(query).exec();
  }

  async deleteOne(
    mondayAccountId: number,
  ): Promise<NewMondayAccountActions | null> {
    return this.mndyFreeSubscriptionModel.findOneAndDelete({
      mondayAccountId,
    });
  }
}
