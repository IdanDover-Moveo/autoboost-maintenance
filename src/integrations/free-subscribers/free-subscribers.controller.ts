import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { IntegrationData } from 'src/auth/auth.types';
import { AppIntegrationGuard } from 'src/auth/guards/integration.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { FreeSubscribersService } from './free-subscribers.service';
import { ActionBlockQuery } from './free-subscribers.types';
import { ActionBody } from '../types/action.types';

@UseGuards(AppIntegrationGuard)
@Controller('integrations/free-subscribers')
export class FreeSubscribersController {
  constructor(private readonly freeSubs: FreeSubscribersService) {}

  @Post('action')
  handleAction(
    @CurrentUser() user: IntegrationData,
    @Query('block') block: ActionBlockQuery,
    @Body() body: ActionBody,
  ) {
    const data = this.freeSubs.handelAction(user, block, body);

    return data;
  }
}
