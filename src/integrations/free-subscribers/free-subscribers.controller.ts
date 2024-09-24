import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { IntegrationData } from 'src/auth/auth.types';
import { AppIntegrationGuard } from 'src/auth/guards/integration.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { FreeSubscribersService } from './free-subscribers.service';

@UseGuards(AppIntegrationGuard)
@Controller('integrations/free-subscribers')
export class FreeSubscribersController {
  constructor(private readonly freeSubs: FreeSubscribersService) {}

  @Post()
  handleIntegration(
    @CurrentUser() user: IntegrationData,
    @Query('type') type: 'trigger' | 'action',
    @Query('integration') integrationName: string,
    @Body() body: any,
  ) {
    console.log(user);
    console.log(body);
    console.log(type);
    console.log(integrationName);

    return 'moshe';
  }
}
