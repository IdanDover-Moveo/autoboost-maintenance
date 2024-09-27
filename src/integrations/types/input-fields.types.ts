export namespace InputFields {
  export interface Base {
    boardId: number;
    itemId: number;
  }

  export interface AddFreeSubscriber extends Base {
    columnId: string;
  }

  export interface RemoveFreeSubscriber extends AddFreeSubscriber {}
}
