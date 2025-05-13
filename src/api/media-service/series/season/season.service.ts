import { BadRequestException, Injectable } from '@nestjs/common';
import { SeasonRepository } from './season.repository';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeriesRepository } from '../series/series.repository';
import { GetSeasonDto } from './dto/get-season.dto';
import { Season } from './schemas/season.schema';

@Injectable()
export class SeasonService {
  constructor(
    private readonly seasonRepository: SeasonRepository,
    private readonly seriesRepository: SeriesRepository,
  ) { }

  async addSeason(userInputs: CreateSeasonDto, uploadedFile: Express.Multer.File): Promise<string> {
    const seriesExist = await this.seriesRepository.exists({ _id: userInputs.series })
    if (!seriesExist) {
      throw new BadRequestException('Series not found!')
    }

    await this.seasonRepository.create(userInputs, uploadedFile)

    return 'Season created successfully.'
  }

  async getAllSeasons(queryFields: GetSeasonDto): Promise<Pick<Season, 'sessionNumber'>[]> {
    return await this.seasonRepository.find(queryFields)
  }
}
