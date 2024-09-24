import { SecureStorage } from '@mondaycom/apps-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MondaySecureStorageService extends SecureStorage {
  constructor() {
    super();
  }
}
