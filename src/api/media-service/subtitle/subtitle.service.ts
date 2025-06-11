import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SubtitleRepository } from './subtitle.repository';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { MovieRepository } from '../movie/repository/movie.repository';
import { EpisodeRepository } from '../series/episode/repository/episode.repository';
import { Types } from 'mongoose';
import { PartialGetSubtitleDto } from './dto/get-subtitle.dto';
import { SubtitleDocument } from './schemas/subtitle.schema';
import * as ErrorMessages from "./constants/error-messages.constant"

interface TsubtitleData {
  movie?: Types.ObjectId;
  episode?: Types.ObjectId;
  language: string
}

@Injectable()
export class SubtitleService {
  constructor(
    private readonly subtitleRepository: SubtitleRepository,
    private readonly movieRepository: MovieRepository,
    private readonly episodeRepository: EpisodeRepository,
  ) { }

  private async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
    if (!uploadedFile.mimetype.startsWith('text/')) {
      throw new BadRequestException('The uploaded file must be in VTT or SRT format.')
    }
  }

  private async validateAssociation(userInputs: CreateSubtitleDto): Promise<void> {
    const hasMovieId = !!userInputs.movie
    const hasEpisodeId = !!userInputs.episode

    if (hasMovieId && hasEpisodeId) {
      throw new BadRequestException(ErrorMessages.MOVIE_OR_EPISODE_BOTH_ERROR)
    }

    if (!hasMovieId && !hasEpisodeId) {
      throw new BadRequestException(ErrorMessages.MOVIE_OR_EPISODE_REQUIRED_ERROR)
    }
  }

  private async verifyMovieExistence(movieId: Types.ObjectId): Promise<void> {
    const movieExists = await this.movieRepository.exists({ _id: movieId })
    if (!movieExists) {
      throw new NotFoundException(ErrorMessages.MOVIE_NOT_FOUND_ERROR(movieId.toString()))
    }
  }

  private async verifyEpisodeExistence(episodeId: Types.ObjectId): Promise<void> {
    const episodeExists = await this.episodeRepository.exists({ _id: episodeId });
    if (!episodeExists) {
      throw new NotFoundException(ErrorMessages.EPISODE_NOT_FOUND_ERROR(episodeId.toString()));
    }
  }

  async addSubtitle(userInputs: CreateSubtitleDto, uploadedFile: Express.Multer.File) {
    await this.validateFile(uploadedFile)
    await this.validateAssociation(userInputs)

    const subtitleData: TsubtitleData = { language: userInputs.language }

    if (userInputs.movie) {
      subtitleData.movie = new Types.ObjectId(userInputs.movie)
      await this.verifyMovieExistence(subtitleData.movie)
      await this.subtitleRepository.create(subtitleData, uploadedFile)
      return ErrorMessages.SUBTITLE_UPLOAD_MOVIE_SUCCESS
    }

    if (userInputs.episode) {
      subtitleData.episode = new Types.ObjectId(userInputs.episode)
      await this.verifyEpisodeExistence(subtitleData.episode)
      await this.subtitleRepository.create(subtitleData, uploadedFile)
      return ErrorMessages.SUBTITLE_UPLOAD_EPISODE_SUCCESS
    }

    return ErrorMessages.SUBTITLE_UPLOAD_SUCCESS
  }

  async getAllSubtitles(
    query: PartialGetSubtitleDto
  ): Promise<Pick<SubtitleDocument, '_id' | 'language' | 'subtitlefile'>[]> {
    const hasMovieQuery = !!query.movie
    const hasEpisodeQuery = !!query.episode

    if (hasMovieQuery && hasEpisodeQuery) return []
    if (!hasMovieQuery && !hasEpisodeQuery) return []

    const findQuery: Partial<PartialGetSubtitleDto> = {}
    
    if (query.movie) findQuery.movie = new Types.ObjectId(query.movie)
    if (query.episode) findQuery.episode = new Types.ObjectId(query.episode)

    return await this.subtitleRepository.find(findQuery)
  }
}
