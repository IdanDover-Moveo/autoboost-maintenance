import { Module } from '@nestjs/common';
import { StringsUtilsService } from './strings.service';

@Module({
  providers: [StringsUtilsService],
  exports: [StringsUtilsService],
})
export class StringsModule {}
