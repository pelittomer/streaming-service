import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IMovieUtilsService } from "./movie-utils.service.interface";
import { MovieRepository } from "../repository/movie.repository";
import { MOVIE_MESSAGES } from "../constants/movie.message";
import { Types } from "mongoose";
import { Movie } from "../entities/movie.entity";

@Injectable()
export class MovieUtilsService implements IMovieUtilsService {
    constructor(
        private readonly movieRepository: MovieRepository,
    ) { }

    async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
        if (!uploadedFile) {
            throw new BadRequestException(MOVIE_MESSAGES.POSTER_REQUIRED_MESSAGE)
        }
    }

    async checkIfMovieExists(title: string): Promise<void> {
        const movieExists = await this.movieRepository.exists({ title });
        if (movieExists) {
            throw new BadRequestException(MOVIE_MESSAGES.MOVIE_ALREADY_EXISTS_MESSAGE);
        }
    }
    
    async getExistingMovie(movieId: Types.ObjectId): Promise<Movie> {
        const movie = await this.movieRepository.findById(movieId)
        if (!movie) {
            throw new NotFoundException(MOVIE_MESSAGES.MOVIE_NOT_FOUND_MESSAGE)
        }
        return movie
    }
}