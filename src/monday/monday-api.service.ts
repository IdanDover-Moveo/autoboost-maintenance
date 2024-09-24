import { QueryVariables } from './../../node_modules/@mondaydotcomorg/api/dist/cjs/lib/constants/index.d';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiClient } from '@mondaydotcomorg/api';
import { MondaySecureStorageService } from './monday-secure-storage.service';
import { AppException } from 'src/exceptions/app.exception';
import { UseApiOptions } from './monday.types';
import { UserData, SecureStorageAccountData } from 'src/auth/auth.types';
import { MondayLoggerService } from './monday-logger.service';

@Injectable()
export class MondayApiService {
  constructor(
    private readonly mSecureStorage: MondaySecureStorageService,
    private readonly mLogger: MondayLoggerService,
  ) {}

  async execute(
    query: string,
    variables: QueryVariables | undefined,
    { user, accessToken }: UseApiOptions,
  ) {
    if (!accessToken) {
      accessToken = await this._getAccessToken(user);
    }

    const mondayApi = new ApiClient(accessToken);

    try {
      const data = await mondayApi.query(query, variables);
      this.mLogger.info(
        `Request successfully sent to monday | query: ${query} | variables: ${variables ? JSON.stringify(variables) : 'NONE'} | by user: ${user.user_id}`,
      );
      return data;
    } catch (err) {
      throw new AppException(
        'could not issue request',
        HttpStatus.BAD_REQUEST,
        err as string,
      );
    }
  }

  private async _getAccessToken(user: UserData): Promise<string> {
    const accountData = await this.mSecureStorage.get<SecureStorageAccountData>(
      `${user.account_id}`,
    );

    if (!accountData) {
      throw new AppException(
        'Your account does not have an access for this app, please go threw the oauth process to continue',
        HttpStatus.BAD_REQUEST,
        'There was an attempt to use the monday api from a user with no saved account',
      );
    }

    const userData = accountData[user.user_id];
    if (!userData) {
      throw new AppException(
        'You do not have an access token for this app, please go threw the oauth process to continue',
        HttpStatus.BAD_REQUEST,
        'There was an attempt to use the monday api from a user with no access token',
      );
    }

    return userData.accessToken;
  }
}
