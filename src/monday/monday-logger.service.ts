import { ConfigService } from '@nestjs/config';
import { Logger } from '@mondaycom/apps-sdk';
import { Injectable } from '@nestjs/common';
import { EnvVariables } from 'src/config/config.types';

@Injectable()
export class MondayLoggerService extends Logger {
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    super(configService.getOrThrow<string>('APP_NAME'));
  }
}
