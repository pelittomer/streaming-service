import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { SeriesRepository } from './series.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from './schemas/series.schema';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository],
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
    UploadModule, SharedUtilsModule
  ],
  exports: [SeriesRepository]
})
export class SeriesModule { }
