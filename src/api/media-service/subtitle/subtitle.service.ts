import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SubtitleRepository } from './subtitle.repository';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { MovieRepository } from '../movie/movie.repository';
import { EpisodeRepository } from '../series/episode/episode.repository';
import { Types } from 'mongoose';
import { PartialGetSubtitleDto } from './dto/get-subtitle.dto';
import { SubtitleDocument } from './schemas/subtitle.schema';

@Injectable()
export class SubtitleService {
  constructor(
    private readonly subtitleRepository: SubtitleRepository,
    private readonly movieRepository: MovieRepository,
    private readonly episodeRepository: EpisodeRepository,
  ) { }

  async addSubtitle(userInputs: CreateSubtitleDto, uploadedFile: Express.Multer.File) {
    if (userInputs.movie && userInputs.episode) {
      throw new BadRequestException('Please provide either a movie ID or an episode ID, not both.')
    }

    if (!userInputs.movie && !userInputs.episode) {
      throw new BadRequestException('Please provide either a movie ID or an episode ID.')
    }

    if (userInputs.movie) {
      const movieExists = await this.movieRepository.exists({ _id: userInputs.movie })
      if (!movieExists) {
        throw new NotFoundException(`Movie with ID "${userInputs.movie}" not found!`)
      }
      await this.subtitleRepository.create({ movie: new Types.ObjectId(userInputs.movie), language: userInputs.language }, uploadedFile)
      return 'Subtitle uploaded and associated with the movie successfully.'
    }

    if (userInputs.episode) {
      const episodeExists = await this.episodeRepository.exists({ _id: userInputs.episode })
      if (!episodeExists) {
        throw new NotFoundException(`Episode with ID "${userInputs.episode}" not found!`)
      }
      await this.subtitleRepository.create({ episode: new Types.ObjectId(userInputs.episode), language: userInputs.language }, uploadedFile)
      return 'Subtitle uploaded and associated with the episode successfully.'
    }

    return 'Subtitle upload successful.'
  }

  async getAllSubtitles(query: PartialGetSubtitleDto): Promise<Pick<SubtitleDocument, '_id' | 'language' | 'subtitlefile'>[]> {
    if (query.episode && query.movie) return []
    if (!query.episode && !query.movie) return []
    if (query.movie) query.movie = new Types.ObjectId(query.movie)
    if (query.episode) query.episode = new Types.ObjectId(query.episode)
    return await this.subtitleRepository.find(query)
  }
}
