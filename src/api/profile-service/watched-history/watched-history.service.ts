import { Injectable } from '@nestjs/common';
import { WatchedHistoryRepository } from './watched-history.repository';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { WatchedHistory } from './schemas/watched-history.schema';

@Injectable()
export class WatchedHistoryService {
  constructor(
    private readonly watchedHistoryRepository: WatchedHistoryRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async recordWatchedHistory(userInputs: CreateWatchedHistoryDto, req: Request): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    const query = { profile: userId }
    const update = { watchDuration: userInputs.watchDuration }
    if (userInputs.movie) {
      const movie = new Types.ObjectId(userInputs.movie)
      await this.watchedHistoryRepository.findOneAndUpdate({ ...query, movie }, update)
    } else if (userInputs.episode) {
      const episode = new Types.ObjectId(userInputs.episode)
      await this.watchedHistoryRepository.findOneAndUpdate({ ...query, episode }, update)
    }

    return 'Watch time recorded.'
  }

  async getAllWatchedHistory(req: Request): Promise<WatchedHistory[]> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)
    return await this.watchedHistoryRepository.find({ profile: userId })
  }
}
