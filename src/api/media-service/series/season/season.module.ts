import { Module } from '@nestjs/common';
import { SeasonService } from './service/season.service';
import { SeasonController } from './season.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from './entities/season.enity';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SeriesModule } from '../series/series.module';
import { SeasonRepository } from './repository/season.repository';
import { SeasonUtilsService } from './utils/season-utils.service';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService, SeasonRepository, SeasonUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }]),
    SharedUtilsModule, UploadModule, SeriesModule
  ],
  exports: [SeasonRepository]
})
export class SeasonModule { }
