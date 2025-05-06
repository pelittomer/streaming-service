import { Injectable } from '@nestjs/common';
import { WatchListRepository } from './watch-list.repository';

@Injectable()
export class WatchListService {
  constructor(
    private readonly watchListRepository: WatchListRepository
  ) { }
  
}
