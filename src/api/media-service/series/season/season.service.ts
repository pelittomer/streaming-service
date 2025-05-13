import { BadRequestException, Injectable } from '@nestjs/common';
import { SeasonRepository } from './season.repository';
import { CreateSeasonDto } from './dto/create-season.dto';
import { SeriesRepository } from '../series/series.repository';

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

}
