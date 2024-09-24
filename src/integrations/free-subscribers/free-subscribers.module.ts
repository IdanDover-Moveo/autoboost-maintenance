import { Module } from '@nestjs/common';
import { FreeSubscribersController } from './free-subscribers.controller';
import { FreeSubscribersService } from './free-subscribers.service';

@Module({
  controllers: [FreeSubscribersController],
  providers: [FreeSubscribersService]
})
export class FreeSubscribersModule {}
