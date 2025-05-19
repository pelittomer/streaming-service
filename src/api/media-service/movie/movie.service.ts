import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PartialGetMovieDto } from './dto/get-movie.dto';
import { Types } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository
  ) { }

  private async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
    if (!uploadedFile) {
      throw new BadRequestException(ErrorMessages.POSTER_REQUIRED_MESSAGE)
    }
  }

  private async checkIfMovieExists(title: string): Promise<void> {
    const movieExists = await this.movieRepository.exists({ title });
    if (movieExists) {
      throw new BadRequestException(ErrorMessages.MOVIE_ALREADY_EXISTS_MESSAGE);
    }
  }

  async addMovie(userInputs: CreateMovieDto, uploadedFile: Express.Multer.File): Promise<string> {
    await this.validateFile(uploadedFile)
    await this.checkIfMovieExists(userInputs.title)

    await this.movieRepository.create(userInputs, uploadedFile)

    return ErrorMessages.MOVIE_CREATED_SUCCESSFULLY_MESSAGE
  }

  async getAllMovies(queryFields: PartialGetMovieDto): Promise<Pick<MovieDocument, '_id' | 'title' | 'synopsis' | 'rate' | 'poster'>[]> {
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

    return await this.movieRepository.find(limit, startIndex, filter, sortCriteria)
  }

  async getMovieById(movieId: Types.ObjectId): Promise<Movie> {
    const movie = await this.movieRepository.findById(movieId)
    if (!movie) {
      throw new NotFoundException(ErrorMessages.MOVIE_NOT_FOUND_MESSAGE)
    }
    return movie
  }
}
