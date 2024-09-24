import { Test, TestingModule } from '@nestjs/testing';
import { FreeSubscribersService } from './free-subscribers.service';

describe('FreeSubscribersService', () => {
  let service: FreeSubscribersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeSubscribersService],
    }).compile();

    service = module.get<FreeSubscribersService>(FreeSubscribersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
