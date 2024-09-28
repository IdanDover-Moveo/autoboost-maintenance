import { MondayApiService } from './monday-api.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserData } from 'src/auth/auth.types';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GraphQlBody } from './monday.types';
import { AppAuthGuard } from 'src/auth/guards/app-auth.guard';

@UseGuards(AppAuthGuard)
@Controller('monday')
export class MondayController {
  constructor(private readonly mondayApi: MondayApiService) {}

  @Post('api')
  async useApi(
    @Body() body: GraphQlBody,
    @CurrentUser() user: UserData,
  ): Promise<DataResponse<unknown>> {
    const data = await this.mondayApi.execute(body.query, body.variables, {
      userId: user.user_id,
      accountId: user.account_id,
    });

    return { data };
  }
}
