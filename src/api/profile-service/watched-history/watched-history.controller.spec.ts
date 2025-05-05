import { Test, TestingModule } from '@nestjs/testing';
import { WatchedHistoryController } from './watched-history.controller';
import { WatchedHistoryService } from './watched-history.service';

describe('WatchedHistoryController', () => {
  let controller: WatchedHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchedHistoryController],
      providers: [WatchedHistoryService],
    }).compile();

    controller = module.get<WatchedHistoryController>(WatchedHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
