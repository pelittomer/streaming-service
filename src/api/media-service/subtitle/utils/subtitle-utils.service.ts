import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MovieRepository } from "../../movie/repository/movie.repository";
import { EpisodeRepository } from "../../series/episode/repository/episode.repository";
import { SUBTITLE_MESSAGES } from "../constants/subtitle.message";
import { CreateSubtitleDto } from "../dto/create-subtitle.dto";
import { ISubtitleUtilsService } from "./subtitle-utils.service.interface";
import { Types } from "mongoose";

@Injectable()
export class SubtitleUtilsService implements ISubtitleUtilsService{
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly episodeRepository: EpisodeRepository,
    ) { }

    async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
        if (!uploadedFile.mimetype.startsWith('text/')) {
            throw new BadRequestException('The uploaded file must be in VTT or SRT format.')
        }
    }

    async validateAssociation(payload: CreateSubtitleDto): Promise<void> {
        const hasMovieId = !!payload.movie
        const hasEpisodeId = !!payload.episode

        if (hasMovieId && hasEpisodeId) {
            throw new BadRequestException(SUBTITLE_MESSAGES.MOVIE_OR_EPISODE_BOTH_ERROR)
        }

        if (!hasMovieId && !hasEpisodeId) {
            throw new BadRequestException(SUBTITLE_MESSAGES.MOVIE_OR_EPISODE_REQUIRED_ERROR)
        }
    }

    async verifyMovieExistence(movieId: Types.ObjectId): Promise<void> {
        const movieExists = await this.movieRepository.exists({ _id: movieId })
        if (!movieExists) {
            throw new NotFoundException(SUBTITLE_MESSAGES.MOVIE_NOT_FOUND_ERROR(movieId.toString()))
        }
    }

    async verifyEpisodeExistence(episodeId: Types.ObjectId): Promise<void> {
        const episodeExists = await this.episodeRepository.exists({ _id: episodeId });
        if (!episodeExists) {
            throw new NotFoundException(SUBTITLE_MESSAGES.EPISODE_NOT_FOUND_ERROR(episodeId.toString()))
        }
    }
}