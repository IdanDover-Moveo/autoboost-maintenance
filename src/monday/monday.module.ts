import { Module } from '@nestjs/common';
import { MondayLoggerService } from './monday-logger.service';
import { MondaySecureStorageService } from './monday-secure-storage.service';
import { MondayController } from './monday.controller';
import { MondayApiService } from './monday-api.service';

@Module({
  providers: [
    MondayLoggerService,
    MondaySecureStorageService,
    MondayApiService,
  ],
  exports: [MondayLoggerService, MondaySecureStorageService, MondayApiService],
  controllers: [MondayController],
})
export class MondayModule {}
