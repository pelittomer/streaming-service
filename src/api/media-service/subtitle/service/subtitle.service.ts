import { Injectable } from '@nestjs/common';
import { SubtitleRepository } from '../repository/subtitle.repository';
import { Types } from 'mongoose';
import { PartialGetSubtitleDto } from '../dto/get-subtitle.dto';
import { SubtitleUtilsService } from '../utils/subtitle-utils.service';
import { SUBTITLE_MESSAGES } from '../constants/subtitle.message';
import { AddSubtitleParams, ISubtitleService, TSubtitleData } from './subtitle.service.interface';
import { TFindSubtitle } from '../repository/subtitle.repository.interface';

@Injectable()
export class SubtitleService implements ISubtitleService {
  constructor(
    private readonly subtitleRepository: SubtitleRepository,
    private readonly subtitleUtilsService: SubtitleUtilsService,
  ) { }

  async addSubtitle({payload,uploadedFile}:AddSubtitleParams) {
    await this.subtitleUtilsService.validateFile(uploadedFile)
    await this.subtitleUtilsService.validateAssociation(payload)

    const subtitleData: TSubtitleData = { language: payload.language }

    if (payload.movie) {
      subtitleData.movie = new Types.ObjectId(payload.movie)
      await this.subtitleUtilsService.verifyMovieExistence(subtitleData.movie)
      await this.subtitleRepository.create({ payload: subtitleData, uploadedFile })
      return SUBTITLE_MESSAGES.SUBTITLE_UPLOAD_MOVIE_SUCCESS
    }

    if (payload.episode) {
      subtitleData.episode = new Types.ObjectId(payload.episode)
      await this.subtitleUtilsService.verifyEpisodeExistence(subtitleData.episode)
      await this.subtitleRepository.create({ payload: subtitleData, uploadedFile })
      return SUBTITLE_MESSAGES.SUBTITLE_UPLOAD_EPISODE_SUCCESS
    }

    return SUBTITLE_MESSAGES.SUBTITLE_UPLOAD_SUCCESS
  }

  async getAllSubtitles(queryFields: PartialGetSubtitleDto): Promise<TFindSubtitle> {
    const hasMoviequeryFields = !!queryFields.movie
    const hasEpisodequeryFields = !!queryFields.episode

    if (hasMoviequeryFields && hasEpisodequeryFields) return []
    if (!hasMoviequeryFields && !hasEpisodequeryFields) return []

    const findqueryFields: Partial<PartialGetSubtitleDto> = {}

    if (queryFields.movie) findqueryFields.movie = new Types.ObjectId(queryFields.movie)
    if (queryFields.episode) findqueryFields.episode = new Types.ObjectId(queryFields.episode)

    return await this.subtitleRepository.find(findqueryFields)
  }
}
