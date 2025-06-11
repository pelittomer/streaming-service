import { Injectable } from '@nestjs/common';
import { SeriesRepository } from '../repository/series.repository';
import { Types } from 'mongoose';
import { PartialGetSeriesDto } from '../dto/get-series.dto';
import { Series } from '../entities/series.entity';
import { SeriesUtilsService } from '../utils/series-utils.service';
import { SERIES_MESSAGES } from '../constants/series.message';
import { AddSeriesParams, ISeriesService } from './series.service.interface';
import { TFindSeries } from '../repository/series.repository.interface';

@Injectable()
export class SeriesService implements ISeriesService {
  constructor(
    private readonly seriesRepository: SeriesRepository,
    private readonly seriesUtilsService: SeriesUtilsService,
  ) { }

  async addSeries({ payload, uploadedFile }: AddSeriesParams): Promise<string> {
    this.seriesUtilsService.validateFile(uploadedFile)
    
    await this.seriesUtilsService.checkIfSeriesExists(payload.title)

    const directorObjectId = new Types.ObjectId(payload.directors)
    await this.seriesRepository.create({
      payload: { ...payload, directors: directorObjectId },
      uploadedFile
    })

    return SERIES_MESSAGES.SERIES_CREATED_SUCCESS
  }

  async getAllSeries(queryFields: PartialGetSeriesDto): Promise<TFindSeries> {
    const limit = 30
    const page = queryFields.page || 1
    const startIndex = (page - 1) * limit

    let filter: any = {}
    let sortCriteria: any = {}

    if (queryFields.categoryId) {
      filter.category = new Types.ObjectId(queryFields.categoryId)
    }
    if (queryFields.q) {
      filter.title = { $regex: new RegExp(queryFields.q, 'i') }
    }
    if (queryFields.sort) {
      const regex = /^(.*?)(?:_|$)(.*?)$/;
      const match = queryFields.sort.match(regex);
      if (match) {
        const [sortField, sortDirection] = match
        sortCriteria[sortField] = sortDirection === 'desc' ? -1 : 1
      }
    }

    return await this.seriesRepository.find({ limit, startIndex, filter, sortCriteria })
  }

  async getSeriesById(seriesId: Types.ObjectId): Promise<Series> {
    return this.seriesUtilsService.getExistingSeries(seriesId)
  }
}
