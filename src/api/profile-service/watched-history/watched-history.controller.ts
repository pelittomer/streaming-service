import { Controller, Get } from '@nestjs/common';
import { WatchedHistoryService } from './watched-history.service';

@Controller('watched-history')
export class WatchedHistoryController {
  constructor(private readonly watchedHistoryService: WatchedHistoryService) { }

  @Get()
  getWatchedHistory() {
    /*
        This endpoint retrieves a list of videos that the currently logged-in user has watched.
     */
  }

}
