import { Module } from '@nestjs/common';
import { SubtitleService } from './service/subtitle.service';
import { SubtitleController } from './subtitle.controller';
import { SubtitleRepository } from './repository/subtitle.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtitle, SubtitleSchema } from './schemas/subtitle.schema';
import { EpisodeModule } from '../series/episode/episode.module';
import { MovieModule } from '../movie/movie.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SubtitleUtilsService } from './utils/subtitle-utils.service';

@Module({
  controllers: [SubtitleController],
  providers: [SubtitleService, SubtitleRepository,SubtitleUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Subtitle.name, schema: SubtitleSchema }]),
    EpisodeModule, MovieModule, UploadModule
  ],
  exports: [SubtitleRepository]

})
export class SubtitleModule { }
