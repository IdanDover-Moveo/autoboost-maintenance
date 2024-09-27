import { InputFields } from './input-fields.types';

export interface ActionBody<IF extends InputFields.Base = InputFields.Base> {
  payload: {
    blockKind: string;
    inboundFieldValues: IF;
    inputFields: IF;
    recipeId: number;
    integrationId: number;
    boardId?: number;
  };
  runtimeMetadata: {
    actionUuid: string;
    triggerUuid: string;
  };
}
