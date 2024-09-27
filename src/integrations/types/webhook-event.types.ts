import { ColumnType } from '@mondaydotcomorg/api';

export type WebhookEventType =
  | 'create_pulse'
  | 'update_column_value'
  | 'create_update';

export namespace WebhookEvent {
  export interface Base {
    app: 'monday';
    type: WebhookEventType;
    triggerTime: string;
    subscriptionId: number;
    triggerUuid: string;
    userId: number;
    originalTriggerUuid: string | null;
    boardId: number;
    pulseId: number;
  }

  export interface CreateItem extends Base {
    type: 'create_pulse';
    pulseName: string;
    groupId: string;
    groupName: string;
    groupColor: string;
    isTopGroup: boolean;
    columnValues: object;
    triggerUuid: string;
  }

  export interface CreateSubitem extends Base {
    type: 'create_pulse';
    pulseName: string;
    groupId: string;
    groupName: string;
    groupColor: string;
    isTopGroup: boolean;
    columnValues: object;
    triggerUuid: string;
    parentItemId: string;
    parentItemBoardId: string;
    itemId: number;
  }

  export interface ChangeColumnValue extends Base {
    type: 'update_column_value';
    pulseName: string;
    groupId: string;
    columnId: string;
    columnType: ColumnType;
    columnTitle: string;
    value: Record<string, any> | null;
    previousValue: Record<string, any> | null;
    changedAt: number;
    isTopGroup: boolean;
  }

  export interface StatusColumnChange extends ChangeColumnValue {
    value: {
      label: {
        index: number;
        text: string;
        style: {
          color: string;
          border: string;
          var_name: string;
        };
      };
      post_id: number | null;
    } | null;
    previousValue: {
      label: {
        index: number;
        text: string;
        style: {
          color: string;
          border: string;
          var_name: string;
        };
      };
      post_id: number | null;
    } | null;
  }

  export interface MirrorChangeBody {
    challenge?: string;
    event: {
      app: 'monday';
      type: string;
      triggerTime: string;
      subscriptionId: number;
      userId: number;
      originalTriggerUuid: string | null;
      boardId: number;
      groupId: string;
      pulseId: number;
      pulseName: string;
      columnId: string;
      columnType: ColumnType;
      columnTitle: string;
      value: {
        label: {
          index: number;
          text: string;
          style: {
            color: string;
            border: string;
            var_name: string;
            is_done: boolean;
          };
          post_id: string | number | null;
        };
      };
      previousValue: {
        label: {
          index: number;
          text: string;
          style: {
            color: string;
            border: string;
            var_name: string;
            is_done: boolean;
          };
          post_id: string | number | null;
        };
      };
      changedAt: number;
      isTopGroup: boolean;
      triggerUuid: string;
    };
  }

  export interface CreateUpdate extends Base {
    type: 'create_update';
    body: string;
    textBody: string;
    updateId: number;
    replyId: number | null;
  }
}

export interface WebhookEventBody<
  WE extends WebhookEvent.Base = WebhookEvent.Base,
> {
  challenge?: string;
  event: WE;
}
