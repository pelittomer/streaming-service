import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchedHistoryService } from './service/watched-history.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { Request } from 'express';
import { GetWatchedHistoryDto } from './dto/get-watched-history.dto';
import { WatchedHistoryQuery } from './dto/watched-history-query.dto';
import { seconds, Throttle } from '@nestjs/throttler';

@Controller('watched-history')
export class WatchedHistoryController {
  constructor(private readonly watchedHistoryService: WatchedHistoryService) { }

  @UseGuards(AuthGuard)
  @Post()
  recordWatchedHistory(
    @Body() payload: CreateWatchedHistoryDto,
    @Req() req: Request
  ) {
    return this.watchedHistoryService.recordWatchedHistory({ payload, req })
  }

  @UseGuards(AuthGuard)
  @Get('all')
  getAllWatchedHistory(
    @Req() req: Request,
    @Query() queryFields: WatchedHistoryQuery
  ) {
    return this.watchedHistoryService.getAllWatchedHistory({ req, queryFields })
  }

  @Throttle({
    short: { ttl: seconds(20), limit: 1 },
  })
  @UseGuards(AuthGuard)
  @Get('')
  getWatchedHistory(
    @Query() queryFields: GetWatchedHistoryDto,
    @Req() req: Request
  ) {
    return this.watchedHistoryService.getWatchedHistory({ queryFields, req })
  }
}
