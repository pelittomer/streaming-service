import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { EpisodeRepository } from './episode.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Episode, EpisodeSchema } from './schemas/episode.schema';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService, EpisodeRepository],
  imports: [
    MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }])
  ],
  exports: [EpisodeRepository]
})
export class EpisodeModule { }
