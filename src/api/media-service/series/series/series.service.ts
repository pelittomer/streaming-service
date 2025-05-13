import { BadRequestException, Injectable } from '@nestjs/common';
import { SeriesRepository } from './series.repository';
import { CreateSeriesDto } from './dto/create-series.dto';
import { Types } from 'mongoose';
import { PartialGetSeriesDto } from './dto/get-series.dto';
import { Series, SeriesDocument } from './schemas/series.schema';

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

  async getAllSeries(queryFields: PartialGetSeriesDto): Promise<Pick<SeriesDocument, '_id' | 'title' | 'synopsis' | 'rate' | 'poster'>[]> {
    const limit = 30
    const page = queryFields.page || 1
    const startIndex = (page - 1) * limit

    let filter: any = {}
    let sortCriteria: any = {}

    if (queryFields.categoryId) {
      filter.category = new Types.ObjectId(queryFields.categoryId)
    }
    if (queryFields.q) {
      filter.title = { $regex: new RegExp(queryFields.q, 'i') };
    }
    if (queryFields.sort) {
      const regex = /^(.*?)(?:_|$)(.*?)$/;
      const match = queryFields.sort.match(regex);
      if (match) {
        const [sortField, sortDirection] = match
        sortCriteria[sortField] = sortDirection === 'desc' ? -1 : 1
      }
    }

    return await this.seriesRepository.find(limit, startIndex, filter, sortCriteria)
  }

  async getSeriesById(seriesId: Types.ObjectId): Promise<Series | string> {
    const series = await this.seriesRepository.findById(seriesId)
    return series ? series : 'Series not found!'
  }
}
