import { Injectable } from '@nestjs/common';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { Favorite } from '../entities/favorite.entity';
import { AddFavoriteParams, GetUserFavoritesParams, IFavoriteService, RemoveAllFavoritesParams, RemoveFavoriteByIdParams } from './favorite.service.interface';
import { FavoriteRepository } from '../repository/favorite.repository';
import { FavoriteUtilsService } from '../utils/favorite-utils.service';
import { FAVORITE_MESSAGES } from '../constants/favorite.message';

@Injectable()
export class FavoriteService implements IFavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly sharedUtilsService: SharedUtilsService,
    private readonly favoriteUtilsService: FavoriteUtilsService,
  ) { }

  async addFavorite({ payload, req }: AddFavoriteParams) {
    return this.favoriteUtilsService.processFavorite({
      payload,
      req,
      operation: '$addToSet',
      successMessageKey: 'ADDED_SUCCESSFULLY'
    })
  }

  async removeFavoriteById({ payload, req }: RemoveFavoriteByIdParams) {
    return this.favoriteUtilsService.processFavorite({
      payload,
      req,
      operation: '$pull',
      successMessageKey: 'REMOVED_SUCCESSFULLY',
      notFoundInFavoritesMessageKey: 'ITEM_NOT_FOUND_IN_FAVORITES'
    })
  }

  async removeAllFavorites({ queryFields, req }: RemoveAllFavoritesParams): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(queryFields.profile)

    await this.favoriteUtilsService.validateProfileOwnership({ userId, profileId: profileObjectId })

    await this.favoriteRepository.findOneAndUpdate({
      payload: { profile: profileObjectId },
      queryFields: { movie: [], series: [] }
    })

    return FAVORITE_MESSAGES.ALL_REMOVED
  }

  async getUserFavorites({ queryFields, req }: GetUserFavoritesParams): Promise<Favorite | null> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(queryFields.profile)

    await this.favoriteUtilsService.validateProfileOwnership({ userId, profileId: profileObjectId })

    return await this.favoriteRepository.findOneAndPopulate({ profile: profileObjectId })
  }
}
