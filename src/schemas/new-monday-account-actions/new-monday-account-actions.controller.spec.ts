import { Test, TestingModule } from '@nestjs/testing';
import { NewMondayAccountActionsController } from './new-monday-account-actions.controller';

describe('NewMondayAccountActionsController', () => {
  let controller: NewMondayAccountActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewMondayAccountActionsController],
    }).compile();

    controller = module.get<NewMondayAccountActionsController>(NewMondayAccountActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
