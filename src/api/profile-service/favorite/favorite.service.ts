import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { PartialFavoriteDto } from './dto/favorite.dto';
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

  async addFavorite(userInputs: PartialFavoriteDto, req: Request) {
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
      const seriesExists = await this.seriesRepository.exists({ _id: series })
      if (!seriesExists) {
        throw new BadRequestException('Series not found.')
      }
      updateSet.series = series
    }

    if (Object.keys(updateSet).length > 0) {
      await this.favoriteRepository.findOneAndUpdate(
        { profile: userId },
        { $addToSet: updateSet } as any
      )

      return `${movie ? 'Movie' : 'Series'} added to favorites successfully.`
    }

    return `${movie ? 'Movie' : 'Series'} added to favorites successfully.`
  }


  async removeFavoriteById(userInputs: PartialFavoriteDto, req: Request) {
    const { movie, series } = userInputs
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    if (!movie && !series) {
      throw new BadRequestException('Movie or series ID required to remove from favorites!')
    }

    const updateQuery: any = { profile: userId }
    const updatePull: any = {}
    let itemType: 'Movie' | 'Series' | null = null

    const favoriteDocument = await this.favoriteRepository.findOne({ profile: userId })
    if (!favoriteDocument) {
      throw new NotFoundException('Favorite list not found for this user.')
    }

    if (movie) {
      const movieObjectId = new Types.ObjectId(movie)
      if (favoriteDocument.movie.find((item) => item.equals(movieObjectId))) {
        updatePull.movie = movieObjectId
        itemType = 'Movie'
      } else {
        throw new NotFoundException('Movie not found in favorites.')
      }
    }

    if (series) {
      const seriesObjectId = new Types.ObjectId(series)
      if (favoriteDocument.series.find((item) => item.equals(seriesObjectId))) {
        updatePull.series = seriesObjectId
        itemType = 'Series'
      } else {
        throw new NotFoundException('Series not found in favorites.')
      }
    }

    if (Object.keys(updatePull).length > 0) {
      await this.favoriteRepository.findOneAndUpdate(
        updateQuery,
        { $pull: updatePull } as any
      )
      return `${itemType} removed from favorites successfully.`
    }

    return 'No items were removed from favorites.'

  }
}
