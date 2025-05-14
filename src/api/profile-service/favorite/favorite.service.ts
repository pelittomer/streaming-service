import { BadRequestException, Injectable } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { PartialCreateFavoriteDto } from './dto/create-favorite.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { MovieRepository } from 'src/api/media-service/movie/movie.repository';
import { SeriesRepository } from 'src/api/media-service/series/series/series.repository';
import { Types } from 'mongoose';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly movieRepository: MovieRepository,
    private readonly seriesRepository: SeriesRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async addFavorite(userInputs: PartialCreateFavoriteDto, req: Request) {
    const { movie, series } = userInputs
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    const updateQuery: any = { profile: userId }
    const updateSet: any = {}

    if (!movie && !series) {
      throw new BadRequestException('Movie or series ID required!')
    }
    if (movie) {
      const movieExists = await this.movieRepository.exists({ _id: movie })
      if (!movieExists) {
        throw new BadRequestException('Movie not found.')
      }
      updateSet.movie = movie
    }

    if (series) {
      const seriesExists = await this.seriesRepository.exists({ _id: movie })
      if (!seriesExists) {
        throw new BadRequestException('Series not found.')
      }
      updateSet.series = series
    }

    await this.favoriteRepository.findOneAndUpdate(updateQuery, updateSet)

    return `${movie ? 'Movie' : 'Series'} added to favorites successfully.`
  }

}
