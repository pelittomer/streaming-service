import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { EPISODE_MESSAGES } from "../constants/episode.message";
import { Types } from "mongoose";
import { Episode } from "../entities/episode.entity";
import { EpisodeRepository } from "../repository/episode.repository";
import { IEpisodeUtilsService } from "./episode-utils.service.interface";
import { SeasonRepository } from "../../season/repository/season.repository";

@Injectable()
export class EpisodeUtilsService implements IEpisodeUtilsService{
    constructor(
        private readonly seasonRepository: SeasonRepository,
        private readonly episodeRepository: EpisodeRepository,
    ) { }

    async verifySeasonExistence(seasonId: Types.ObjectId): Promise<void> {
        const seasonExists = await this.seasonRepository.exists({ _id: seasonId })
        if (!seasonExists) {
            throw new BadRequestException(EPISODE_MESSAGES.SEASON_NOT_FOUND_ERROR)
        }
    }

    async getExistingEpisode(episodeId: Types.ObjectId): Promise<Episode> {
        const episode = await this.episodeRepository.findById(episodeId)
        if (!episode) {
            throw new NotFoundException(EPISODE_MESSAGES.EPISODE_NOT_FOUND_ERROR)
        }
        return episode
    }
}