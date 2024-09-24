import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MondayModule } from 'src/monday/monday.module';
import { AppEventsController } from './app-events.controller';
import { AppEventsService } from './app-events.service';

@Module({
  imports: [AuthModule, MondayModule],
  controllers: [AppEventsController],
  providers: [AppEventsService],
})
export class AppEventsModule {}
