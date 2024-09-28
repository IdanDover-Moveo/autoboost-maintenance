import { Test, TestingModule } from '@nestjs/testing';
import { StringsUtilsService } from './strings.service';

describe('StringsService', () => {
  let service: StringsUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StringsUtilsService],
    }).compile();

    service = module.get<StringsUtilsService>(StringsUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
