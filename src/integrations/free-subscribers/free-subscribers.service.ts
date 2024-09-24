import { Injectable } from '@nestjs/common';
import { IntegrationData } from 'src/auth/auth.types';

@Injectable()
export class FreeSubscribersService {
  handleIntegration(
    user: IntegrationData,
    type: string,
    integrationName: string,
    body: any,
  ) {
    console.log(user);
    console.log(type);
    console.log(integrationName);
    console.log(body);
    return 'moshe';
  }
}
