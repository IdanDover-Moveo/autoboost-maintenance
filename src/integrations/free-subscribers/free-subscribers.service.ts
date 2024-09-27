import { IntegrationData } from 'src/auth/auth.types';
import { FreeSubscribersActionHandler } from './free-subscribers-action.handler';
import { ActionBlockNames, ActionBlockQuery } from './free-subscribers.types';
import { AppException } from 'src/exceptions/app.exception';
import { ActionBody } from '../types/action.types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InputFields } from '../types/input-fields.types';

@Injectable()
export class FreeSubscribersService {
  private actionBlockMap: Map<ActionBlockQuery, ActionBlockNames>;
  constructor(
    private readonly freeSubsActionHandler: FreeSubscribersActionHandler,
  ) {
    this.actionBlockMap = new Map<ActionBlockQuery, ActionBlockNames>([
      ['add-free-subscriber', 'addFreeSubscriber'],
      ['remove-free-subscriber', 'removeFreeSubscriber'],
    ]);
  }
  handelAction(
    user: IntegrationData,
    block: ActionBlockQuery,
    body: ActionBody,
  ) {
    const blockName = this.actionBlockMap.get(block);
    if (!blockName) {
      throw new AppException('Invalid block name', HttpStatus.BAD_REQUEST);
    }
    return this.freeSubsActionHandler[blockName](
      user,
      body.payload.inputFields as any,
    );
  }
}
