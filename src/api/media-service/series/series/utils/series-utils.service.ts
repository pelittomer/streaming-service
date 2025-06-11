import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { SERIES_MESSAGES } from "../constants/series.message";
import { SeriesRepository } from "../repository/series.repository";
import { ISeriesUtilsService } from "./series-utils.service.interface";
import { Series } from "../entities/series.entity";
import { Types } from "mongoose";

@Injectable()
export class SeriesUtilsService implements ISeriesUtilsService {
    constructor(
        private readonly seriesRepository: SeriesRepository
    ) { }

    validateFile(uploadedFile: Express.Multer.File): void {
        if (!uploadedFile) {
            throw new BadRequestException('Poster is required')
        }
    }

    async checkIfSeriesExists(title: string): Promise<void> {
        const seriesExists = await this.seriesRepository.exists({ title });
        if (seriesExists) {
            throw new BadRequestException(SERIES_MESSAGES.SERIES_ALREADY_EXISTS_ERROR);
        }
    }

    async getExistingSeries(seriesId: Types.ObjectId): Promise<Series> {
        const series = await this.seriesRepository.findById(seriesId)
        if (!series) {
            throw new NotFoundException(SERIES_MESSAGES.SERIES_NOT_FOUND_ERROR)
        }
        return series
    }
}