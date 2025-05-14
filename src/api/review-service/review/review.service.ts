import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { MovieRepository } from 'src/api/media-service/movie/movie.repository';
import { EpisodeRepository } from 'src/api/media-service/series/episode/episode.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly sharedUtilsService: SharedUtilsService,
    private readonly movieRepository: MovieRepository,
    private readonly episodeRepository: EpisodeRepository,
  ) { }

  private async validateEntity(id: Types.ObjectId | undefined, repository: any, entityName: string) {
    if (id) {
      const exists = await repository.exists({ _id: id })
      if (!exists) {
        throw new BadRequestException(`${entityName} not found!`)
      }
    }
  }

  async addReview(userInputs: CreateReviewDto, req: Request) {
    const { movie, episode } = userInputs;
    const userId = new Types.ObjectId(this.sharedUtilsService.getUserInfo(req).userId)

    if (!movie && !episode) {
      throw new BadRequestException('Movie or episode ID is required!')
    }

    await this.validateEntity(movie, this.movieRepository, 'Movie')
    await this.validateEntity(episode, this.episodeRepository, 'Episode')

    await this.reviewRepository.create({
      ...userInputs,
      movie: movie ? new Types.ObjectId(movie) : undefined,
      episode: episode ? new Types.ObjectId(episode) : undefined,
      user: userId
    })

    return 'Review created successfully.'
  }

}
