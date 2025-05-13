import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodeRepository } from './episode.repository';
import { SeasonRepository } from '../season/season.repository';
import { Types } from 'mongoose';
import { GetEpisodeDto } from './dto/get-episode.dto';
import { Episode } from './schemas/episode.schema';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly episodeRepository: EpisodeRepository,
    private readonly seasonRepository: SeasonRepository
  ) { }

  async addEpisode(userInputs: CreateEpisodeDto): Promise<string> {
    const seasonExists = await this.seasonRepository.exists({ _id: userInputs.season })
    if (!seasonExists) {
      throw new BadRequestException('Season not found!')
    }

    userInputs.season = new Types.ObjectId(userInputs.season)
    await this.episodeRepository.create(userInputs)

    return 'Episode created successfully.'
  }

  async getAllEpisode(queryFields: GetEpisodeDto): Promise<Episode[]> {
    queryFields.season = new Types.ObjectId(queryFields.season)
    return await this.episodeRepository.find(queryFields)
  }

  async getEpisodeById(episodeId: Types.ObjectId): Promise<Episode | null> {
    return await this.episodeRepository.findById(episodeId)
  }
}
