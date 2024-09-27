export namespace MondayFieldType {
  export interface Base {
    boardId: number;
  }
}

export interface MondayFieldTypeBody<
  FT extends MondayFieldType.Base = MondayFieldType.Base,
> {
  payload: {
    boardId: number;
    automationId: number;
    dependencyData: FT;
    recipeId: number;
    integrationId: number;
  };
  runtimeMetadata: {
    actionUuid: string;
    triggerUuid: string;
  };
}
