import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { AudioRepository } from './audio.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Audio, AudioSchema } from './schemas/audio.schema';
import { MovieModule } from '../movie/movie.module';
import { EpisodeModule } from '../series/episode/episode.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';

@Module({
  controllers: [AudioController],
  providers: [AudioService, AudioRepository],
  imports: [
    MongooseModule.forFeature([{ name: Audio.name, schema: AudioSchema }]),
    MovieModule, EpisodeModule, UploadModule, SharedUtilsModule
  ],
  exports: [AudioRepository]
})
export class AudioModule { }
