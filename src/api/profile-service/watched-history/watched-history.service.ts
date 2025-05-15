import { Injectable } from '@nestjs/common';
import { WatchedHistoryRepository } from './watched-history.repository';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';

@Injectable()
export class WatchedHistoryService {
  constructor(
    private readonly watchedHistoryRepository: WatchedHistoryRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async recordWatchedHistory(userInputs: CreateWatchedHistoryDto, req: Request): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)
    const movie = new Types.ObjectId(userInputs.movie)
    const episode = new Types.ObjectId(userInputs.episode)

    const query = { profile: userId }
    const update = { watchDuration: userInputs.watchDuration }
    if (movie) {
      await this.watchedHistoryRepository.findOneAndUpdate({ ...query, movie }, update)
    } else if (episode) {
      await this.watchedHistoryRepository.findOneAndUpdate({ ...query, episode }, update)
    }

    return 'Watch time recorded.'
  }
}
