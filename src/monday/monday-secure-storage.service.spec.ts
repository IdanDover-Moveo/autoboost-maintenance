import { Test, TestingModule } from '@nestjs/testing';
import { MondaySecureStorageService } from './monday-secure-storage.service';

describe('MondaySecureStorageService', () => {
  let service: MondaySecureStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MondaySecureStorageService],
    }).compile();

    service = module.get<MondaySecureStorageService>(MondaySecureStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
