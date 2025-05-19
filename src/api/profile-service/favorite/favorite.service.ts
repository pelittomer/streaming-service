import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { MovieRepository } from 'src/api/media-service/movie/movie.repository';
import { SeriesRepository } from 'src/api/media-service/series/series/series.repository';
import { Types } from 'mongoose';
import { Favorite } from './schemas/favorite.schema';
import * as ErrorMessages from "./constants/error-messages.constant"
import { ProfileRepository } from '../profile/profile.repository';
import { GetFavoriteDto } from './dto/get-favorite.dto';
import { CreateFavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly movieRepository: MovieRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly seriesRepository: SeriesRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }


  private async validateProfileOwnership(userId: Types.ObjectId, profileId: Types.ObjectId): Promise<void> {
    const profileExists = await this.profileRepository.exists({ user: userId, _id: profileId })
    if (!profileExists) {
      throw new BadRequestException(ErrorMessages.PROFILE_NOT_FOUND)
    }
  }

  private async validateMediaExistence(movie?: Types.ObjectId, series?: Types.ObjectId) {
    if (!movie && !series) {
      throw new BadRequestException(ErrorMessages.MOVIE_OR_SERIES_REQUIRED)
    }

    const [repository, notFoundErrorMessage] = movie
      ? [this.movieRepository, ErrorMessages.MOVIE_NOT_FOUND]
      : [this.seriesRepository, ErrorMessages.SERIES_NOT_FOUND]

    const exists = await repository.exists({ _id: movie || series })

    if (!exists) {
      throw new BadRequestException(notFoundErrorMessage)
    }
  }

  private async processFavorite(
    userInputs: CreateFavoriteDto,
    req: Request,
    operation: '$addToSet' | '$pull',
    successMessageKey: string,
    notFoundInFavoritesMessageKey?: string
  ) {
    const { movie, series, profile } = userInputs
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileId = new Types.ObjectId(profile)

    await this.validateProfileOwnership(userId, profileId)
    await this.validateMediaExistence(movie, series)

    let mediaId: Types.ObjectId | undefined,
      mediaType: 'movie' | 'series',
      itemType: 'Movie' | 'Series'

    const updateQuery = { profile: profileId },
      updateSet: any = {}

    if (movie) {
      mediaId = new Types.ObjectId(movie)
      mediaType = 'movie'
      updateSet.movie = mediaId
      itemType = "Movie"
    } else if (series) {
      mediaId = new Types.ObjectId(series)
      mediaType = 'series'
      updateSet.series = mediaId
      itemType = "Series"
    }
    if (operation === '$pull') {
      const favoriteDocument = await this.favoriteRepository.findOne(updateQuery)
      if (!favoriteDocument) {
        throw new NotFoundException(ErrorMessages.FAVORITE_LIST_NOT_FOUND)
      }
      const itemIdToCheck = mediaId!
      const existingItem = favoriteDocument[mediaType!].find((item) => item.equals(itemIdToCheck))
      if (!existingItem) {
        throw new NotFoundException(notFoundInFavoritesMessageKey || ErrorMessages.ITEM_NOT_FOUND_IN_FAVORITES)
      }
    }
    if (Object.keys(updateSet).length > 0) {
      await this.favoriteRepository.findOneAndUpdate(
        updateQuery,
        { [operation]: updateSet } as any
      )
      return `${itemType!}${ErrorMessages[successMessageKey]}`
    }
    return null
  }

  async addFavorite(userInputs: CreateFavoriteDto, req: Request) {
    return this.processFavorite(
      userInputs,
      req,
      '$addToSet',
      'ADDED_SUCCESSFULLY'
    )
  }


  async removeFavoriteById(userInputs: CreateFavoriteDto, req: Request) {
    return this.processFavorite(
      userInputs,
      req,
      '$pull',
      'REMOVED_SUCCESSFULLY',
      'ITEM_NOT_FOUND_IN_FAVORITES'
    )
  }

  async removeAllFavorites(req: Request, queryFields: GetFavoriteDto): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(queryFields.profile)

    await this.validateProfileOwnership(userId, profileObjectId)

    await this.favoriteRepository.findOneAndUpdate(
      { profile: profileObjectId },
      { movie: [], series: [] }
    )

    return ErrorMessages.ALL_REMOVED
  }

  async getUserFavorites(req: Request, queryFields: GetFavoriteDto): Promise<Favorite | null> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(queryFields.profile)

    await this.validateProfileOwnership(userId, profileObjectId)

    return await this.favoriteRepository.findOneAndPopulate({ profile: profileObjectId })
  }
}
