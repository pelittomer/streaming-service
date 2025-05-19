import { BadRequestException, Injectable } from '@nestjs/common';
import { SeasonRepository } from './season.repository';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeriesRepository } from '../series/series.repository';
import { GetSeasonDto } from './dto/get-season.dto';
import { Season } from './schemas/season.schema';
import { Types } from 'mongoose';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class SeasonService {
  constructor(
    private readonly seasonRepository: SeasonRepository,
    private readonly seriesRepository: SeriesRepository,
  ) { }

  private async verifySeriesExistence(seriesId: Types.ObjectId): Promise<void> {
    const seriesExists = await this.seriesRepository.exists({ _id: seriesId })
    if (!seriesExists) {
      throw new BadRequestException(ErrorMessages.SERIES_NOT_FOUND_ERROR)
    }
  }

  async addSeason(
    userInputs: CreateSeasonDto,
    uploadedFile: Express.Multer.File
  ): Promise<string> {
    const seriesId = new Types.ObjectId(userInputs.series)
    await this.verifySeriesExistence(seriesId)
    await this.seasonRepository.create({ ...userInputs, series: seriesId }, uploadedFile)
    return ErrorMessages.SEASON_CREATED_SUCCESS
  }

  async getAllSeasons(
    queryFields: GetSeasonDto
  ): Promise<Pick<Season, 'sessionNumber'>[]> {
    return await this.seasonRepository.find(queryFields)
  }
}
