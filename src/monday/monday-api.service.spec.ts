import { Test, TestingModule } from '@nestjs/testing';
import { MondayApiService } from './monday-api.service';

describe('MondayApiService', () => {
  let service: MondayApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MondayApiService],
    }).compile();

    service = module.get<MondayApiService>(MondayApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
