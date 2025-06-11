import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IAudioUtilsService } from "./audio-utils.service.interface";
import { CreateAudioDto } from "../dto/create-audio.dto";
import { MovieRepository } from "../../movie/movie.repository";
import { EpisodeRepository } from "../../series/episode/episode.repository";
import { AUDIO_MESSAGES } from "../constants/audio.message";
import { Types } from "mongoose";

@Injectable()
export class AudioUtilsService implements IAudioUtilsService {
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly episodeRepository: EpisodeRepository,
    ) { }

    async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
        if (!uploadedFile || !uploadedFile.mimetype.startsWith('video/')) {
            throw new BadRequestException(AUDIO_MESSAGES.AUDIO_FILE_MISSING_OR_INVALID)
        }
    }

    async validateAssociation(payload: CreateAudioDto): Promise<void> {
        const hasMovieId = !!payload.movie
        const hasEpisodeId = !!payload.episode

        if (hasMovieId && hasEpisodeId) {
            throw new BadRequestException(AUDIO_MESSAGES.MOVIE_OR_EPISODE_BOTH)
        }

        if (!hasMovieId && !hasEpisodeId) {
            throw new BadRequestException(AUDIO_MESSAGES.MOVIE_OR_EPISODE_REQUIRED)
        }
    }

    async verifyMovieExistence(movieId: Types.ObjectId): Promise<void> {
        const movieExists = await this.movieRepository.exists({ _id: movieId })
        if (!movieExists) {
            throw new NotFoundException(AUDIO_MESSAGES.MOVIE_NOT_FOUND(movieId.toString()))
        }
    }

    async verifyEpisodeExistence(episodeId: Types.ObjectId): Promise<void> {
        const episodeExists = await this.episodeRepository.exists({ _id: episodeId })
        if (!episodeExists) {
            throw new NotFoundException(AUDIO_MESSAGES.EPISODE_NOT_FOUND(episodeId.toString()))
        }
    }
}