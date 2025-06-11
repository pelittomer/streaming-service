import { BadRequestException, Injectable } from '@nestjs/common';
import { PopulatedReview, ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { MovieRepository } from 'src/api/media-service/movie/repository/movie.repository';
import { EpisodeRepository } from 'src/api/media-service/series/episode/episode.repository';
import { PartialGetReviewDto } from './dto/get-review.dto';
import * as ErrorMessages from "./constants/error-messages.constant";
import { WatchedHistoryRepository } from 'src/api/profile-service/watched-history/watched-history.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly sharedUtilsService: SharedUtilsService,
    private readonly movieRepository: MovieRepository,
    private readonly episodeRepository: EpisodeRepository,
    private readonly watchedHistoryRepository: WatchedHistoryRepository,
  ) { }

  private async validateEntityExistence(id: Types.ObjectId | undefined, repository: any, entityName: string) {
    if (id) {
      const exists = await repository.exists({ _id: id })
      if (!exists) {
        const errorMessage = entityName === 'Movie' ?
          ErrorMessages.MOVIE_NOT_FOUND
          : ErrorMessages.EPISODE_NOT_FOUND
        throw new BadRequestException(errorMessage)
      }
    }
  }

  private async validateMovieOrEpisode(movie?: Types.ObjectId, episode?: Types.ObjectId): Promise<void> {
    if (!movie && !episode) {
      throw new BadRequestException(ErrorMessages.MOVIE_OR_EPISODE_REQUIRED)
    }
    await this.validateEntityExistence(movie, this.movieRepository, 'Movie')
    await this.validateEntityExistence(episode, this.episodeRepository, 'Episode')
  }

  async addReview(userInputs: CreateReviewDto, req: Request) {
    const { movie, episode, profile, comment } = userInputs;
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    await this.validateMovieOrEpisode(movie, episode)

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

    return 'Review created successfully.'
  }

  async getAllReviews(query: PartialGetReviewDto): Promise<PopulatedReview[]> {
    const { movie, episode } = query

    await this.validateMovieOrEpisode(movie, episode)

    return await this.reviewRepository.find({
      movie: movie ? new Types.ObjectId(movie) : undefined,
      episode: episode ? new Types.ObjectId(episode) : undefined,
    })
  }
}
