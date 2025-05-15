import { Module } from '@nestjs/common';
import { WatchedHistoryService } from './watched-history.service';
import { WatchedHistoryController } from './watched-history.controller';
import { WatchedHistoryRepository } from './watched-history.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchedHistory, WatchedHistorySchema } from './schemas/watched-history.schema';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';

@Module({
  controllers: [WatchedHistoryController],
  providers: [WatchedHistoryService, WatchedHistoryRepository],
  imports: [
    MongooseModule.forFeature([{ name: WatchedHistory.name, schema: WatchedHistorySchema }]),
    SharedUtilsModule
  ],
  exports: [WatchedHistoryRepository]
})
export class WatchedHistoryModule { }
