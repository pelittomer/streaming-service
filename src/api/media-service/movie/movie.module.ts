import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './entities/movie.entity';
import { MovieRepository } from './repository/movie.repository';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { MovieUtilsService } from './utils/movie-utils.service';
import { MovieService } from './service/movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, MovieUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    UploadModule, SharedUtilsModule
  ],
  exports: [MovieRepository]
})
export class MovieModule { }
