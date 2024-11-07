import { Injectable } from '@nestjs/common';
import { IntegrationData } from 'src/auth/auth.types';
import { InputFields } from '../types/input-fields.types';
import { MondayApiService } from 'src/monday/monday-api.service';
import { MondayAccountFreeSubscriptionService } from 'src/schemas/monday-account-free-subscription/monday-account-free-subscription.service';

@Injectable()
export class FreeSubscribersActionHandlerService {
  constructor(
    private readonly mndyAccountFreeSubs: MondayAccountFreeSubscriptionService,
    private readonly mndyApi: MondayApiService,
  ) {}

  async addFreeSubscriber(
    user: IntegrationData,
    inputFields: InputFields.AddFreeSubscriber,
  ) {
    const { userId, accountId } = user;
    const { columnId, itemId } = inputFields;
    const mndyData = await this.mndyApi.execute(
      `
query ($itemId: ID!, $columnIds: [String!]) {
  items(ids: [$itemId]) {
    column_values(ids: $columnIds) {
      id
      type
      text
      value
    }
  }
}
      `,
      { itemId: itemId, columnIds: [columnId] },
      {
        userId,
        accountId,
      },
    );
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
