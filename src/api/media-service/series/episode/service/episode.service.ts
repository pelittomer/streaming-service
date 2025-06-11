import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { EpisodeRepository } from '../repository/episode.repository';
import { Types } from 'mongoose';
import { GetEpisodeDto } from '../dto/get-episode.dto';
import { Episode } from '../entities/episode.entity';
import { EpisodeUtilsService } from '../utils/episode-utils.service';
import { EPISODE_MESSAGES } from '../constants/episode.message';
import { IEpisodeService } from './episode.service.interface';

@Injectable()
export class EpisodeService implements IEpisodeService{
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly episodeUtilsService: EpisodeUtilsService,
  ) { }

  async addEpisode(payload: CreateEpisodeDto): Promise<string> {
    const seasonId = new Types.ObjectId(payload.season)
    await this.episodeUtilsService.verifySeasonExistence(seasonId)
    await this.episodeRepository.create({ ...payload, season: seasonId })
    return EPISODE_MESSAGES.EPISODE_CREATED_SUCCESS
  }

  async getAllEpisode(queryFields: GetEpisodeDto): Promise<Episode[]> {
    queryFields.season = new Types.ObjectId(queryFields.season)
    return await this.episodeRepository.find(queryFields)
  }

  getEpisodeById(episodeId: Types.ObjectId): Promise<Episode> {
    return this.episodeUtilsService.getExistingEpisode(episodeId)
  }
}
