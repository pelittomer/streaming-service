import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchedHistoryService } from './watched-history.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { Request } from 'express';
import { GetWatchedHistoryDto } from './dto/get-watched-history.dto';
import { WatchedHistoryQuery } from './dto/watched-history-query.dto';

@Controller('watched-history')
export class WatchedHistoryController {
  constructor(private readonly watchedHistoryService: WatchedHistoryService) { }

  @UseGuards(AuthGuard)
  @Post()
  recordWatchedHistory(
    @Body() userInputs: CreateWatchedHistoryDto,
    @Req() req: Request
  ) {
    return this.watchedHistoryService.recordWatchedHistory(userInputs, req)
  }

  @UseGuards(AuthGuard)
  @Get('all')
  getAllWatchedHistory(
    @Req() req: Request,
    @Query() query: WatchedHistoryQuery
  ) {
    return this.watchedHistoryService.getAllWatchedHistory(req, query)
  }

  @UseGuards(AuthGuard)
  @Get('')
  getWatchedHistory(
    @Query() query: GetWatchedHistoryDto,
    @Req() req: Request
  ) {
    return this.watchedHistoryService.getWatchedHistory(query, req)
  }
}
