import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AudioRepository } from './audio.repository';
import { MovieRepository } from '../movie/movie.repository';
import { EpisodeRepository } from '../series/episode/episode.repository';
import { CreateAudioDto } from './dto/create-audio.dto';
import { PartialGetAudioDto } from './dto/get-audio.dto';
import { AudioDocument } from './schemas/audio.schema';
import { Types } from 'mongoose';
import * as ErrorMessages from "./constants/error-messages.constant"

interface TAudioData {
  movie?: Types.ObjectId;
  episode?: Types.ObjectId;
  language: string
}

@Injectable()
export class AudioService {
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly movieRepository: MovieRepository,
    private readonly episodeRepository: EpisodeRepository,
  ) { }

  private async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
    if (!uploadedFile || !uploadedFile.mimetype.startsWith('video/')) {
      throw new BadRequestException(ErrorMessages.AUDIO_FILE_MISSING_OR_INVALID)
    }
  }

  private async validateAssociation(userInputs: CreateAudioDto): Promise<void> {
    const hasMovieId = !!userInputs.movie
    const hasEpisodeId = !!userInputs.episode

    if (hasMovieId && hasEpisodeId) {
      throw new BadRequestException(ErrorMessages.MOVIE_OR_EPISODE_BOTH)
    }

    if (!hasMovieId && !hasEpisodeId) {
      throw new BadRequestException(ErrorMessages.MOVIE_OR_EPISODE_REQUIRED)
    }
  }

  private async verifyMovieExistence(movieId: Types.ObjectId): Promise<void> {
    const movieExists = await this.movieRepository.exists({ _id: movieId })
    if (!movieExists) {
      throw new NotFoundException(ErrorMessages.MOVIE_NOT_FOUND(movieId.toString()))
    }
  }

  private async verifyEpisodeExistence(episodeId: Types.ObjectId): Promise<void> {
    const episodeExists = await this.episodeRepository.exists({ _id: episodeId })
    if (!episodeExists) {
      throw new NotFoundException(ErrorMessages.EPISODE_NOT_FOUND(episodeId.toString()))
    }
  }

  async addAudio(
    userInputs: CreateAudioDto,
    uploadedFile: Express.Multer.File
  ): Promise<string> {
    await this.validateFile(uploadedFile)
    await this.validateAssociation(userInputs)
    const audioData: TAudioData = { language: userInputs.language }

    if (userInputs.movie) {
      audioData.movie = new Types.ObjectId(userInputs.movie)
      await this.verifyMovieExistence(userInputs.movie)
      await this.audioRepository.create(audioData, uploadedFile)
      return ErrorMessages.AUDIO_UPLOAD_MOVIE_SUCCESS
    }

    if (userInputs.episode) {
      audioData.episode = new Types.ObjectId(userInputs.episode)
      await this.verifyEpisodeExistence(userInputs.episode)
      await this.audioRepository.create(audioData, uploadedFile)
      return ErrorMessages.AUDIO_UPLOAD_EPISODE_SUCCESS
    }

    // This line should normally not be reached, but it's added for TypeScript control.
    return ErrorMessages.AUDIO_UPLOAD_SUCCESS
  }

  async getAllAudios(
    query: PartialGetAudioDto
  ): Promise<Pick<AudioDocument, '_id' | 'language' | 'audioFile'>[]> {
    const hasMovieQuery = !!query.movie
    const hasEpisodeQuery = !!query.episode

    if (hasMovieQuery && hasEpisodeQuery) return []
    if (!hasMovieQuery && !hasEpisodeQuery) return []

    const findQuery: Partial<PartialGetAudioDto> = {}
    if (query.movie) findQuery.movie = new Types.ObjectId(query.movie)
    if (query.episode) findQuery.episode = new Types.ObjectId(query.episode)

    return await this.audioRepository.find(findQuery)
  }
}
