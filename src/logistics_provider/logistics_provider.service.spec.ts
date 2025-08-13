import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsProviderService } from './logistics_provider.service';

describe('LogisticsProviderService', () => {
  let service: LogisticsProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogisticsProviderService],
    }).compile();

    service = module.get<LogisticsProviderService>(LogisticsProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
