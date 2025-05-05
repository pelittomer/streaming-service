import { Test, TestingModule } from '@nestjs/testing';
import { WatchedHistoryService } from './watched-history.service';

describe('WatchedHistoryService', () => {
  let service: WatchedHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchedHistoryService],
    }).compile();

    service = module.get<WatchedHistoryService>(WatchedHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
