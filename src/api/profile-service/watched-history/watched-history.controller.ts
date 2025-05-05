import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WatchedHistoryService } from './watched-history.service';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { UpdateWatchedHistoryDto } from './dto/update-watched-history.dto';

@Controller('watched-history')
export class WatchedHistoryController {
  constructor(private readonly watchedHistoryService: WatchedHistoryService) {}

  @Post()
  create(@Body() createWatchedHistoryDto: CreateWatchedHistoryDto) {
    return this.watchedHistoryService.create(createWatchedHistoryDto);
  }

  @Get()
  findAll() {
    return this.watchedHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchedHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWatchedHistoryDto: UpdateWatchedHistoryDto) {
    return this.watchedHistoryService.update(+id, updateWatchedHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchedHistoryService.remove(+id);
  }
}
