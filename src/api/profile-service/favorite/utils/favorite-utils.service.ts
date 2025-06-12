import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IFavoriteUtilsService, ProcessFavoriteParams, ValidateMediaExistenceParams, ValidateProfileOwnershipParams } from "./favorite-utils.service.interface";
import { SeriesRepository } from "src/api/media-service/series/series/repository/series.repository";
import { ProfileRepository } from "../../profile/repository/profile.repository";
import { MovieRepository } from "src/api/media-service/movie/repository/movie.repository";
import { Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { FavoriteRepository } from "../repository/favorite.repository";
import { FAVORITE_MESSAGES } from "../constants/favorite.message";

@Injectable()
export class FavoriteUtilsService implements IFavoriteUtilsService {
    constructor(
        private readonly movieRepository: MovieRepository,
        private readonly profileRepository: ProfileRepository,
        private readonly seriesRepository: SeriesRepository,
        private readonly favoriteRepository: FavoriteRepository,
        private readonly sharedUtilsService: SharedUtilsService,
    ) { }

    async validateProfileOwnership({ profileId, userId }: ValidateProfileOwnershipParams): Promise<void> {
        const profileExists = await this.profileRepository.exists({ user: userId, _id: profileId })
        if (!profileExists) {
            throw new BadRequestException(FAVORITE_MESSAGES.PROFILE_NOT_FOUND)
        }
    }

    async validateMediaExistence({ movie, series }: ValidateMediaExistenceParams): Promise<void> {
        if (!movie && !series) {
            throw new BadRequestException(FAVORITE_MESSAGES.MOVIE_OR_SERIES_REQUIRED)
        }

        const [repository, notFoundErrorMessage] = movie
            ? [this.movieRepository, FAVORITE_MESSAGES.MOVIE_NOT_FOUND]
            : [this.seriesRepository, FAVORITE_MESSAGES.SERIES_NOT_FOUND]

        const exists = await repository.exists({ _id: movie || series })

        if (!exists) {
            throw new BadRequestException(notFoundErrorMessage)
        }
    }

    async processFavorite({ operation, req, successMessageKey, payload, notFoundInFavoritesMessageKey }: ProcessFavoriteParams): Promise<string | null> {
        const { movie, series, profile } = payload
        const userId = this.sharedUtilsService.getUserIdFromRequest(req)
        const profileId = new Types.ObjectId(profile)

        await this.validateProfileOwnership({ userId, profileId })
        await this.validateMediaExistence({ movie, series })

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
                throw new NotFoundException(FAVORITE_MESSAGES.FAVORITE_LIST_NOT_FOUND)
            }
            const itemIdToCheck = mediaId!
            const existingItem = favoriteDocument[mediaType!].find((item) => item.equals(itemIdToCheck))
            if (!existingItem) {
                throw new NotFoundException(notFoundInFavoritesMessageKey || FAVORITE_MESSAGES.ITEM_NOT_FOUND_IN_FAVORITES)
            }
        }
        if (Object.keys(updateSet).length > 0) {
            await this.favoriteRepository.findOneAndUpdate({
                payload: updateQuery,
                queryFields: { [operation]: updateSet } as any
            })
            return `${itemType!}${FAVORITE_MESSAGES[successMessageKey]}`
        }
        return null
    }

}