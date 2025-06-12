import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repository/review.repository';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { PartialGetReviewDto } from '../dto/get-review.dto';
import { ReviewUtilsService } from '../utils/review-utils.service';
import { AddReviewParams } from './review.service.interface';
import { PopulatedReview } from '../repository/review.repository.interface';
import { REVIEW_MESSAGES } from '../constants/review.message';
import { WatchedHistoryRepository } from 'src/api/profile-service/watched-history/repository/watched-history.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly sharedUtilsService: SharedUtilsService,
    private readonly reviewUtilsService: ReviewUtilsService,
    private readonly watchedHistoryRepository: WatchedHistoryRepository,
  ) { }

  async addReview({ payload, req }: AddReviewParams): Promise<string> {
    const { movie, episode, profile, comment } = payload;
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)

    await this.reviewUtilsService.validateMovieOrEpisode({ movie, episode })

    const userAlreadyWatch = await this.watchedHistoryRepository.exists({
      profile: new Types.ObjectId(profile),
      movie: movie ? new Types.ObjectId(movie) : undefined,
      episode: episode ? new Types.ObjectId(episode) : undefined,
    })

    await this.reviewRepository.create({
      comment,
      movie: movie ? new Types.ObjectId(movie) : undefined,
      episode: episode ? new Types.ObjectId(episode) : undefined,
      user: userId,
      blur: userAlreadyWatch ? true : false
    })

    return REVIEW_MESSAGES.REVIEW_SUCCESS
  }

  async getAllReviews(queryFields: PartialGetReviewDto): Promise<PopulatedReview[]> {
    const { movie, episode } = queryFields

    await this.reviewUtilsService.validateMovieOrEpisode({ movie, episode })

    return await this.reviewRepository.find({
      movie: movie ? new Types.ObjectId(movie) : undefined,
      episode: episode ? new Types.ObjectId(episode) : undefined,
    })
  }
}
