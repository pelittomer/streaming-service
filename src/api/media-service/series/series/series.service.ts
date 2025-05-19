import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SeriesRepository } from './series.repository';
import { CreateSeriesDto } from './dto/create-series.dto';
import { Types } from 'mongoose';
import { PartialGetSeriesDto } from './dto/get-series.dto';
import { Series, SeriesDocument } from './schemas/series.schema';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepository: SeriesRepository
  ) { }

  private async checkIfSeriesExists(title: string): Promise<void> {
    const seriesExists = await this.seriesRepository.exists({ title });
    if (seriesExists) {
      throw new BadRequestException(ErrorMessages.SERIES_ALREADY_EXISTS_ERROR);
    }
  }

  async addSeries(userInputs: CreateSeriesDto, uploadedFile: Express.Multer.File): Promise<string> {
    await this.checkIfSeriesExists(userInputs.title)

    const directorObjectId = new Types.ObjectId(userInputs.directors)
    await this.seriesRepository.create({ ...userInputs, directors: directorObjectId }, uploadedFile)
    return ErrorMessages.SERIES_CREATED_SUCCESS
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

    return await this.seriesRepository.find(limit, startIndex, filter, sortCriteria)
  }

  async getSeriesById(seriesId: Types.ObjectId): Promise<Series> {
    const series = await this.seriesRepository.findById(seriesId)
    if (!series) {
      throw new NotFoundException(ErrorMessages.SERIES_NOT_FOUND_ERROR)
    }
    return series
  }
}
