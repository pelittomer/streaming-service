import { Module } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';
import { WatchListRepository } from './watch-list.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchList, WatchListSchema } from './schemas/watch-list.schema';

@Module({
  controllers: [WatchListController],
  providers: [WatchListService, WatchListRepository],
  imports: [
    MongooseModule.forFeature([{ name: WatchList.name, schema: WatchListSchema }]),
  ],
  exports: [WatchListRepository]
})
export class WatchListModule { }
