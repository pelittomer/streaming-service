import { BadRequestException, Injectable } from '@nestjs/common';
import { SeriesRepository } from './series.repository';
import { CreateSeriesDto } from './dto/create-series.dto';
import { Types } from 'mongoose';

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepository: SeriesRepository
  ) { }

  async addSeries(userInputs: CreateSeriesDto, uploadedFile: Express.Multer.File): Promise<string> {
    const seriesExists = await this.seriesRepository.exists({ title: userInputs.title })
    if (seriesExists) {
      throw new BadRequestException('Series already exists!')
    }
    userInputs.directors = new Types.ObjectId(userInputs.directors)
    
    await this.seriesRepository.create(userInputs, uploadedFile)

    return 'Series created successfully.'
  }
}
