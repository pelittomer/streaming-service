import { BadRequestException, Injectable } from "@nestjs/common";
import { MovieRepository } from "src/api/media-service/movie/repository/movie.repository";
import { EpisodeRepository } from "src/api/media-service/series/episode/repository/episode.repository";
import { ValidateEntityExistenceParams, ValidateMovieOrEpisodeParams } from "./review-utils.service.interface";
import { REVIEW_MESSAGES } from "../constants/review.message";

@Injectable()
export class ReviewUtilsService {
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly episodeRepository: EpisodeRepository,
    ) { }

    async validateEntityExistence({ entityName, id, repository }: ValidateEntityExistenceParams): Promise<void> {
        if (id) {
            const exists = await repository.exists({ _id: id })
            if (!exists) {
                const errorMessage = entityName === 'Movie' ?
                    REVIEW_MESSAGES.MOVIE_NOT_FOUND
                    : REVIEW_MESSAGES.EPISODE_NOT_FOUND
                throw new BadRequestException(errorMessage)
            }
        }
    }

    async validateMovieOrEpisode({ episode, movie }: ValidateMovieOrEpisodeParams): Promise<void> {
        if (!movie && !episode) {
            throw new BadRequestException(REVIEW_MESSAGES.MOVIE_OR_EPISODE_REQUIRED)
        }
        await this.validateEntityExistence({ id: movie, repository: this.movieRepository, entityName: 'Movie' })
        await this.validateEntityExistence({ id: episode, repository: this.episodeRepository, entityName: 'Episode' })
    }
}