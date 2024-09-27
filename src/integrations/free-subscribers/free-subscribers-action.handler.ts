import { Injectable } from '@nestjs/common';
import { IntegrationData } from 'src/auth/auth.types';
import { MondayAccountFreeSubscriptionService } from 'src/monday-account-free-subscription/monday-account-free-subscription.service';
import { InputFields } from '../types/input-fields.types';

@Injectable()
export class FreeSubscribersActionHandler {
  constructor(
    private readonly mndyAccountFreeSubs: MondayAccountFreeSubscriptionService,
  ) {}

  async addFreeSubscriber(
    user: IntegrationData,
    inputFields: InputFields.AddFreeSubscriber,
  ) {
    const data = await this.mndyAccountFreeSubs.create({
      mondayAccountId: user.userId,
    });
    return data;
  }
  async removeFreeSubscriber(
    user: IntegrationData,
    inputFields: InputFields.RemoveFreeSubscriber,
  ) {
    const data = this.mndyAccountFreeSubs.deleteOne(user.userId);
    return data;
  }
}
