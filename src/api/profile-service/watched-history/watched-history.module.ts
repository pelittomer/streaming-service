import { Module } from '@nestjs/common';
import { WatchedHistoryService } from './service/watched-history.service';
import { WatchedHistoryController } from './watched-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchedHistory, WatchedHistorySchema } from './entities/watched-history.entity';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { ProfileModule } from '../profile/profile.module';
import { WatchedHistoryUtilsService } from './utils/watched-history-utils.service';
import { WatchedHistoryRepository } from './repository/watched-history.repository';

@Module({
  controllers: [WatchedHistoryController],
  providers: [WatchedHistoryService, WatchedHistoryRepository, WatchedHistoryUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: WatchedHistory.name, schema: WatchedHistorySchema }]),
    SharedUtilsModule, ProfileModule
  ],
  exports: [WatchedHistoryRepository]
})
export class WatchedHistoryModule { }
