import { Test, TestingModule } from '@nestjs/testing';
import { MondayLoggerService } from './monday-logger.service';

describe('MondayLoggerService', () => {
  let service: MondayLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MondayLoggerService],
    }).compile();

    service = module.get<MondayLoggerService>(MondayLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
