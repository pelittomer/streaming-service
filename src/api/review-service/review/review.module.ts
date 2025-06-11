import { Module } from '@nestjs/common';
import { ReviewService } from './service/review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schema/review.schema';
import { ReviewRepository } from './repository/review.repository';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { MovieModule } from 'src/api/media-service/movie/movie.module';
import { EpisodeModule } from 'src/api/media-service/series/episode/episode.module';
import { WatchedHistoryModule } from 'src/api/profile-service/watched-history/watched-history.module';
import { ReviewUtilsService } from './utils/review-utils.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository, ReviewUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    SharedUtilsModule, MovieModule, EpisodeModule, WatchedHistoryModule
  ],
  exports: []
})
export class ReviewModule { }
