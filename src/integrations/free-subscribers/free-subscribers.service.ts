import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { UserData } from 'src/auth/auth.types';

@Injectable()
export class FreeSubscribersService {
  handleIntegration(user: UserData, type: string, integrationName: string) {
    console.log(user);
    console.log(type);
    console.log(integrationName);
    return 'moshe';
  }
}
