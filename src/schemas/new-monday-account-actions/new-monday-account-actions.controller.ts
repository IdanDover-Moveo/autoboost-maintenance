import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewMondayAccountActionsService } from './new-monday-account-actions.service';
import { AppException } from 'src/exceptions/app.exception';
import { AppAuthGuard } from 'src/auth/guards/app-auth.guard';

@UseGuards(AppAuthGuard)
@Controller('api/new-monday-account-actions')
export class NewMondayAccountActionsController {
  constructor(
    private readonly newMondayAccountActionsService: NewMondayAccountActionsService,
  ) {}

  @Get('/:accountId')
  async getByMonth(
    @Param('accountId') accountId: number,
    @Query('month') month: string,
  ) {
    if (!accountId || !month) {
      throw new AppException(
        'Invalid request, must add a month with format MM/YYYY',
        HttpStatus.BAD_REQUEST,
      );
    }
    const accountActions = await this.newMondayAccountActionsService.find({
      mondayAccountId: accountId,
      month,
    });

    return {
      mondayAccountId: accountActions?.mondayAccountId,
      actions: accountActions?.actions,
      actionCounterStartDate: accountActions?.actionsCounterStartDate,
      actionsCounterEndDate: accountActions?.actionsCounterEndDate,
      isActive: accountActions?.isActive,
      month: accountActions?.month,
      plan_id: accountActions?.plan_id,
      subscription: accountActions?.subscription,
    };
  }
}
