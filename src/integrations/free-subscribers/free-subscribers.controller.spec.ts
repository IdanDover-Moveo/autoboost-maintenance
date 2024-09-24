import { Test, TestingModule } from '@nestjs/testing';
import { FreeSubscribersController } from './free-subscribers.controller';

describe('FreeSubscribersController', () => {
  let controller: FreeSubscribersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FreeSubscribersController],
    }).compile();

    controller = module.get<FreeSubscribersController>(FreeSubscribersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
