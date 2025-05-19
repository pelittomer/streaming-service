import { BadRequestException, Injectable } from '@nestjs/common';
import { WatchedHistoryRepository } from './watched-history.repository';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { WatchedHistory } from './schemas/watched-history.schema';
import { GetWatchedHistoryDto } from './dto/get-watched-history.dto';
import { WatchedHistoryQuery } from './dto/watched-history-query.dto';
import { ProfileRepository } from '../profile/profile.repository';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class WatchedHistoryService {
  constructor(
    private readonly watchedHistoryRepository: WatchedHistoryRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  private async validateProfileOwnership(
    profileId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<void> {
    const matchUser = await this.profileRepository.exists({ _id: profileId, user: userId })
    if (!matchUser) {
      throw new BadRequestException(ErrorMessages.HISTORY_NOT_MATCH_ACCOUNT)
    }
  }

  private async getProfileObjectIdAndValidate(
    req: Request,
    profileIdFromQuery: WatchedHistoryQuery
  ): Promise<Types.ObjectId> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(profileIdFromQuery.profile)

    await this.validateProfileOwnership(profileObjectId, userId)
    return profileObjectId
  }

  async recordWatchedHistory(
    userInputs: CreateWatchedHistoryDto,
    req: Request
  ): Promise<string> {
    const profileObjectId = await this.getProfileObjectIdAndValidate(req, userInputs)

    const query = { profile: profileObjectId }
    const updateFields = { watchDuration: userInputs.watchDuration }
    if (userInputs.movie) {
      const movie = new Types.ObjectId(userInputs.movie)
      await this.watchedHistoryRepository.findOneAndUpdate({ ...query, movie }, updateFields)
    } else if (userInputs.episode) {
      const episode = new Types.ObjectId(userInputs.episode)
      await this.watchedHistoryRepository.findOneAndUpdate({ ...query, episode }, updateFields)
    }

    return ErrorMessages.WATCH_TIME_RECORDED
  }

  async getAllWatchedHistory(
    req: Request,
    queryFields: WatchedHistoryQuery
  ): Promise<WatchedHistory[]> {
    const profileObjectId = await this.getProfileObjectIdAndValidate(req, queryFields)
    return await this.watchedHistoryRepository.find({ profile: profileObjectId })
  }

  async getWatchedHistory(
    queryFields: GetWatchedHistoryDto,
    req: Request
  ): Promise<WatchedHistory | null> {
    const profileObjectId = await this.getProfileObjectIdAndValidate(req, queryFields)

    if (queryFields.episode) queryFields.episode = new Types.ObjectId(queryFields.episode)
    if (queryFields.movie) queryFields.episode = new Types.ObjectId(queryFields.movie)

    return await this.watchedHistoryRepository.findOne({ ...queryFields, profile: profileObjectId })
  }
}
