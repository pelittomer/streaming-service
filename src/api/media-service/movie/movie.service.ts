import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';

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
}
