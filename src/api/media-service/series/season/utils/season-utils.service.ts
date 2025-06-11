import { BadRequestException, Injectable } from "@nestjs/common";
import { ISeasonUtilsService } from "./season-utils.service.interface";
import { Types } from "mongoose";
import { SeriesRepository } from "../../series/series.repository";
import { SEASON_MESSAGES } from "../constants/season.message";

@Injectable()
export class SeasonUtilsService implements ISeasonUtilsService {
    constructor(
        private readonly seriesRepository: SeriesRepository,
    ) { }

    async verifySeriesExistence(seriesId: Types.ObjectId): Promise<void> {
        const seriesExists = await this.seriesRepository.exists({ _id: seriesId })
        if (!seriesExists) {
            throw new BadRequestException(SEASON_MESSAGES.SERIES_NOT_FOUND_ERROR)
        }
    }
}