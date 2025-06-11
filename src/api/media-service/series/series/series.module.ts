import { Module } from '@nestjs/common';
import { SeriesService } from './service/series.service';
import { SeriesController } from './series.controller';
import { SeriesRepository } from './repository/series.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from './entities/series.entity';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { SeriesUtilsService } from './utils/series-utils.service';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository, SeriesUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
    UploadModule, SharedUtilsModule
  ],
  exports: [SeriesRepository]
})
export class SeriesModule { }
