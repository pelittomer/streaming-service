import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AddMovieParams, IMovieService } from './movie.service.interface';
import { MovieRepository } from '../repository/movie.repository';
import { PartialGetMovieDto } from '../dto/get-movie.dto';
import { MovieUtilsService } from '../utils/movie-utils.service';
import { MOVIE_MESSAGES } from '../constants/movie.message';
import { Movie } from '../entities/movie.entity';
import { TFindMovie } from '../repository/movie.repository.interface';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly movieUtilsService: MovieUtilsService,
  ) { }

  async addMovie({ payload, uploadedFile }: AddMovieParams): Promise<string> {
    await this.movieUtilsService.validateFile(uploadedFile)
    await this.movieUtilsService.checkIfMovieExists(payload.title)

    await this.movieRepository.create({ payload, uploadedFile })

    return MOVIE_MESSAGES.MOVIE_CREATED_SUCCESSFULLY_MESSAGE
  }

  async getAllMovies(queryFields: PartialGetMovieDto): Promise<TFindMovie> {
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

    return await this.movieRepository.find({ limit, startIndex, filter, sortCriteria })
  }

  getMovieById(movieId: Types.ObjectId): Promise<Movie> {
    return this.movieUtilsService.getExistingMovie(movieId)
  }
}
