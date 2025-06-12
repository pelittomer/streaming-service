import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { WatchedHistory } from '../entities/watched-history.entity';
import { WatchedHistoryUtilsService } from '../utils/watched-history-utils.service';
import { WatchedHistoryRepository } from '../repository/watched-history.repository';
import { WATCHED_HISTORY_MESSAGE } from '../constants/watched-history.message';
import { GetAllWatchedHistoryParams, GetWatchedHistoryParams, IWatchedHistoryService, RecordWatchedHistoryParams } from './watched-history.service.interface';

@Injectable()
export class WatchedHistoryService implements IWatchedHistoryService {
  constructor(
    private readonly watchedHistoryRepository: WatchedHistoryRepository,
    private readonly watchedHistoryUtilsService: WatchedHistoryUtilsService,
  ) { }

  async recordWatchedHistory({ payload, req }: RecordWatchedHistoryParams): Promise<string> {
    const profileObjectId = await this.watchedHistoryUtilsService.getProfileObjectIdAndValidate({ req, profileIdFromQuery: payload })

    const query = { profile: profileObjectId }
    const updateFields = { watchDuration: payload.watchDuration }
    if (payload.movie) {
      const movie = new Types.ObjectId(payload.movie)
      await this.watchedHistoryRepository.findOneAndUpdate({
        queryFields: { ...query, movie },
        payload: updateFields
      })
    } else if (payload.episode) {
      const episode = new Types.ObjectId(payload.episode)
      await this.watchedHistoryRepository.findOneAndUpdate({
        queryFields: { ...query, episode },
        payload: updateFields
      })
    }

    return WATCHED_HISTORY_MESSAGE.WATCH_TIME_RECORDED
  }

  async getAllWatchedHistory({ queryFields, req }: GetAllWatchedHistoryParams): Promise<WatchedHistory[]> {
    const profileObjectId = await this.watchedHistoryUtilsService.getProfileObjectIdAndValidate({ req, profileIdFromQuery: queryFields })
    return await this.watchedHistoryRepository.find({ profile: profileObjectId })
  }

  async getWatchedHistory({ queryFields, req }: GetWatchedHistoryParams): Promise<WatchedHistory | null> {
    const profileObjectId = await this.watchedHistoryUtilsService.getProfileObjectIdAndValidate({ req, profileIdFromQuery: queryFields })

    if (queryFields.episode) queryFields.episode = new Types.ObjectId(queryFields.episode)
    if (queryFields.movie) queryFields.episode = new Types.ObjectId(queryFields.movie)

    return await this.watchedHistoryRepository.findOne({ ...queryFields, profile: profileObjectId })
  }
}
