import { Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Post()
  addMovie() {
    //Adds a new movie to the database.
  }

  @Get()
  getAllMovies() {
    //Retrieves a list of all available movies.
  }

  @Get(':id')
  getMovieById() {
    //Retrieves a specific movie based on the provided ID.
  }

}
