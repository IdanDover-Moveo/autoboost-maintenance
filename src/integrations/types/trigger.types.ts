import { InputFields } from './input-fields.types';

export interface TriggerBody<IF extends InputFields.Base = InputFields.Base> {
  challenge?: string;
  payload: {
    recipeId: number;
    integrationId: number;
    subscriptionId: number;
    webhookId: number;
    webhookUrl: string;
    blockMetadata: { shouldCalculateDynamicMapping: boolean };
    inboundFieldValues: IF;
    inputFields: IF;
  };
}
