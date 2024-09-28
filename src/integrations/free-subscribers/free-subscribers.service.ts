import { IntegrationData } from 'src/auth/auth.types';
import { FreeSubscribersActionHandlerService } from './free-subscribers-action-handler.service';
import { ActionBlockQuery } from './free-subscribers.types';
import { AppException } from 'src/exceptions/app.exception';
import { ActionBody } from '../types/action.types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { StringsUtilsService } from 'src/utils/strings/strings.service';

@Injectable()
export class FreeSubscribersService {
  constructor(
    private readonly freeSubsActionHandler: FreeSubscribersActionHandlerService,
    private readonly stringUtils: StringsUtilsService,
  ) {}
  handelAction(
    user: IntegrationData,
    block: ActionBlockQuery,
    body: ActionBody,
  ) {
    const action = this.stringUtils.convertKebabCaseToCamelCase(block);
    if (
      !(action in this.freeSubsActionHandler) ||
      typeof this.freeSubsActionHandler[action] !== 'function'
    ) {
      throw new AppException(
        'Invalid block name',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.freeSubsActionHandler[action](user, body.payload.inputFields);
  }
}
