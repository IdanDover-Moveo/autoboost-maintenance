import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsAuthController } from './integrations-auth.controller';

describe('IntegrationsController', () => {
  let controller: IntegrationsAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationsAuthController],
    }).compile();

    controller = module.get<IntegrationsAuthController>(
      IntegrationsAuthController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
