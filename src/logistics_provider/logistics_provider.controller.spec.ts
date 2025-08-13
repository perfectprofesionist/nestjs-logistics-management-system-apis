import { Test, TestingModule } from '@nestjs/testing';
import { LogisticsProviderController } from './logistics_provider.controller';

describe('LogisticsProviderController', () => {
  let controller: LogisticsProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticsProviderController],
    }).compile();

    controller = module.get<LogisticsProviderController>(LogisticsProviderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
