import { Module } from '@nestjs/common';
import { EpisodeService } from './service/episode.service';
import { EpisodeController } from './episode.controller';
import { EpisodeRepository } from './repository/episode.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Episode, EpisodeSchema } from './entities/episode.entity';
import { SeasonModule } from '../season/season.module';
import { EpisodeUtilsService } from './utils/episode-utils.service';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService, EpisodeRepository, EpisodeUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }]),
    SeasonModule
  ],
  exports: [EpisodeRepository]
})
export class EpisodeModule { }
