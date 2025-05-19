import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodeRepository } from './episode.repository';
import { SeasonRepository } from '../season/season.repository';
import { Types } from 'mongoose';
import { GetEpisodeDto } from './dto/get-episode.dto';
import { Episode } from './schemas/episode.schema';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class EpisodeService {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly seasonRepository: SeasonRepository
  ) { }

  private async verifySeasonExistence(seasonId: Types.ObjectId): Promise<void> {
    const seasonExists = await this.seasonRepository.exists({ _id: seasonId })
    if (!seasonExists) {
      throw new BadRequestException(ErrorMessages.SEASON_NOT_FOUND_ERROR)
    }
  }

  async addEpisode(userInputs: CreateEpisodeDto): Promise<string> {
    const seasonId = new Types.ObjectId(userInputs.season)
    await this.verifySeasonExistence(seasonId)
    await this.episodeRepository.create({ ...userInputs, season: seasonId })
    return ErrorMessages.EPISODE_CREATED_SUCCESS
  }

  async getAllEpisode(queryFields: GetEpisodeDto): Promise<Episode[]> {
    queryFields.season = new Types.ObjectId(queryFields.season)
    return await this.episodeRepository.find(queryFields)
  }

  async getEpisodeById(episodeId: Types.ObjectId): Promise<Episode> {
    const episode = await this.episodeRepository.findById(episodeId)
    if (!episode) {
      throw new NotFoundException(ErrorMessages.EPISODE_NOT_FOUND_ERROR)
    }
    return episode
  }
}
