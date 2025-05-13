import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { SeasonRepository } from './season.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from './schemas/season.schema';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SeriesModule } from '../series/series.module';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService, SeasonRepository],
  imports: [
    MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }]),
    SharedUtilsModule, UploadModule, SeriesModule
  ],
  exports: [SeasonRepository]
})
export class SeasonModule { }
