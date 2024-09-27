import { Test, TestingModule } from '@nestjs/testing';
import { MondayAccountFreeSubscriptionService } from './monday-account-free-subscription.service';

describe('MondayAccountFreeSubscriptionService', () => {
  let service: MondayAccountFreeSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MondayAccountFreeSubscriptionService],
    }).compile();

    service = module.get<MondayAccountFreeSubscriptionService>(MondayAccountFreeSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
