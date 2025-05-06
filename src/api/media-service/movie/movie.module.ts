import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MovieRepository } from './movie.repository';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  exports: [MovieRepository]
})
export class MovieModule { }
