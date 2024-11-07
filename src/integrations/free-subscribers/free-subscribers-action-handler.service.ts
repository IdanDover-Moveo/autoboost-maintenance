import { HttpStatus, Injectable } from '@nestjs/common';
import { IntegrationData } from 'src/auth/auth.types';
import { InputFields } from '../types/input-fields.types';
import { MondayApiService } from 'src/monday/monday-api.service';
import { MondayAccountFreeSubscriptionService } from 'src/schemas/monday-account-free-subscription/monday-account-free-subscription.service';
import { AppException } from 'src/exceptions/app.exception';

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
    const accIdToAdd = await this.getClientAccId(user, inputFields);
    const data = await this.mndyAccountFreeSubs.create({
      mondayAccountId: +accIdToAdd,
    });
    return data;
  }

  async removeFreeSubscriber(
    user: IntegrationData,
    inputFields: InputFields.RemoveFreeSubscriber,
  ) {
    const accIdToRemove = await this.getClientAccId(user, inputFields);
    const data = this.mndyAccountFreeSubs.deleteOne(accIdToRemove);
    return data;
  }

  private async getClientAccId(
    user: IntegrationData,
    inputFields: InputFields.AddFreeSubscriber,
  ): Promise<number> {
    const { userId, accountId } = user;
    const { columnId, itemId } = inputFields;
    const mndyData = await this.mndyApi.execute<{ items: any }>(
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

    const clientAccId = JSON.parse(mndyData.items[0].column_values[0].value);

    if (!clientAccId || !Number.isInteger(+clientAccId)) {
      this.mndyApi.execute(
        `mutation ($itemId: ID!, $message: String!) {
  create_update (item_id: $itemId, body: $message) {
    id
  }
}
        `,
        {
          itemId,
          message: `Client account id: ${clientAccId} is not a number, please check that you send a valid account id using the automation`,
        },
        { userId, accountId },
      );
      throw new AppException(
        'Account id to add must be a number',
        HttpStatus.OK,
      );
    }

    return +clientAccId;
  }
}
