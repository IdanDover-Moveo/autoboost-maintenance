import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppEventsService } from './app-events.service';
import { AppEventBody } from './app-events.types';
import { AppEventsGuard } from 'src/auth/guards/app-events.guard';

@UseGuards(AppEventsGuard)
@Controller('app-events')
export class AppEventsController {
  constructor(private readonly appEventsService: AppEventsService) {}

  @Post()
  handleEvent(
    @Body() event: AppEventBody | undefined,
  ): string | Promise<string> {
    return this.appEventsService.handleEvent(event);
  }
}
