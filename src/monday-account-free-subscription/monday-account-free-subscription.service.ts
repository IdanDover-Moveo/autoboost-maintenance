import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MondayAccountFreeSubscription } from 'src/schemas/monday-account-free-subscription.schema';

@Injectable()
export class MondayAccountFreeSubscriptionService {
  constructor(
    @InjectModel(MondayAccountFreeSubscription.name)
    private readonly mndyFreeSubscriptionModel: Model<MondayAccountFreeSubscription>,
  ) {}

  async create(
    createFreeSubscription: MondayAccountFreeSubscription,
  ): Promise<MondayAccountFreeSubscription> {
    const createdFreeSubscription = new this.mndyFreeSubscriptionModel(
      createFreeSubscription,
    );
    return createdFreeSubscription.save();
  }

  async findAll(): Promise<MondayAccountFreeSubscription[]> {
    return this.mndyFreeSubscriptionModel.find().exec();
  }

  async findOne(
    mondayAccountId: number,
  ): Promise<MondayAccountFreeSubscription | null> {
    return this.mndyFreeSubscriptionModel.findOne({ mondayAccountId }).exec();
  }

  async deleteOne(
    mondayAccountId: number,
  ): Promise<MondayAccountFreeSubscription | null> {
    return this.mndyFreeSubscriptionModel.findOneAndDelete({
      mondayAccountId,
    });
  }
}
