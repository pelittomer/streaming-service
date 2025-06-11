import { Injectable } from '@nestjs/common';
import { GetSeasonDto } from '../dto/get-season.dto';
import { Types } from 'mongoose';
import { AddSeasonParams, ISeasonService } from './season.service.interface';
import { SeasonRepository } from '../repository/season.repository';
import { SeasonUtilsService } from '../utils/season-utils.service';
import { SEASON_MESSAGES } from '../constants/season.message';
import { TFindSeason } from '../repository/season.repository.interface';

@Injectable()
export class SeasonService implements ISeasonService {
  constructor(
    private readonly seasonRepository: SeasonRepository,
    private readonly seasonUtilsService: SeasonUtilsService,
  ) { }

  async addSeason({ payload, uploadedFile }: AddSeasonParams): Promise<string> {
    const seriesId = new Types.ObjectId(payload.series)
    await this.seasonUtilsService.verifySeriesExistence(seriesId)
    await this.seasonRepository.create({
      payload: { ...payload, series: seriesId },
      uploadedFile
    })
    return SEASON_MESSAGES.SEASON_CREATED_SUCCESS
  }

  async getAllSeasons(queryFields: GetSeasonDto): Promise<TFindSeason> {
    return await this.seasonRepository.find(queryFields)
  }
}
