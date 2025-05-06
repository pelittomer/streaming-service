import { Controller } from '@nestjs/common';
import { WatchedHistoryService } from './watched-history.service';

@Controller('watched-history')
export class WatchedHistoryController {
  constructor(private readonly watchedHistoryService: WatchedHistoryService) {}


}
