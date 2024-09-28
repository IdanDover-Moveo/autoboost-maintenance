import { Module } from '@nestjs/common';
import { StringsModule } from './strings/strings.module';

@Module({
  imports: [StringsModule],
  exports: [StringsModule],
})
export class UtilsModule {}
