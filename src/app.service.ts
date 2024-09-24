import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): DataResponse<string> {
    return { data: 'alive' };
  }
}
