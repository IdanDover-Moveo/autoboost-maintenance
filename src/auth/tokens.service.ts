import { HttpStatus, Injectable } from '@nestjs/common';
import { MondaySecureStorageService } from 'src/monday/monday-secure-storage.service';
import { SecureStorageAccountData, SecureStorageUserToken } from './auth.types';
import { AppException } from 'src/exceptions/app.exception';

@Injectable()
export class TokensService {
  constructor(private readonly mndySecureStorage: MondaySecureStorageService) {}

  async getAccessToken(
    accountId: number,
    userId: number,
  ): Promise<string | null> {
    const accountData =
      await this.mndySecureStorage.get<SecureStorageAccountData>(
        `${accountId}`,
      );

    if (!accountData) {
      return null;
    }

    const accessToken = accountData[userId]?.accessToken;

    if (!accessToken) {
      return null;
    }
    return accessToken;
  }
}
