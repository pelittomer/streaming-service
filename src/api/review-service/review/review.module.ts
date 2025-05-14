import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schema/review.schema';
import { ReviewRepository } from './review.repository';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { MovieModule } from 'src/api/media-service/movie/movie.module';
import { EpisodeModule } from 'src/api/media-service/series/episode/episode.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    SharedUtilsModule, MovieModule, EpisodeModule
  ],
  exports: []
})
export class ReviewModule { }
