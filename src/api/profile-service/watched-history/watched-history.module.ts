import { Module } from '@nestjs/common';
import { WatchedHistoryService } from './watched-history.service';
import { WatchedHistoryController } from './watched-history.controller';

@Module({
  controllers: [WatchedHistoryController],
  providers: [WatchedHistoryService],
})
export class WatchedHistoryModule {}
