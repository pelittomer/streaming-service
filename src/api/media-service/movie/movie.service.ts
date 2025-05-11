import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PartialGetMovieDto } from './dto/get-movie.dto';
import { Types } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    private readonly movieRepository: MovieRepository
  ) { }

  async addMovie(userInputs: CreateMovieDto, uploadedFile: Express.Multer.File): Promise<string> {
    if (!uploadedFile) {
      throw new BadRequestException('Poster is required!')
    }
    const movieExists = await this.movieRepository.exists({ title: userInputs.title })
    if (movieExists) {
      throw new BadRequestException('Movie is already exits.')
    }

    await this.movieRepository.create(userInputs, uploadedFile)

    return 'Movie created successfully.'
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
      filter.title = { $regex: new RegExp(queryFields.q, 'i') };
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

  async getMovieById(movieId: Types.ObjectId): Promise<Movie | null> {
    return await this.movieRepository.findById(movieId)
  }
}
