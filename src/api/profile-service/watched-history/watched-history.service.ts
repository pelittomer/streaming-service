import { Injectable } from '@nestjs/common';
import { WatchedHistoryRepository } from './watched-history.repository';

@Injectable()
export class WatchedHistoryService {
  constructor(
    private readonly watchedHistoryRepository: WatchedHistoryRepository
  ) { }

}
