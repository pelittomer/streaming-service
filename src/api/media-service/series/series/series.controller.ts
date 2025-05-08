import { Controller, Get, Post } from '@nestjs/common';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) { }

  @Post()
  addSeries() {
    //Adds a new TV series to the database.
  }


  @Get()
  getAllSeries() {
    //Retrieves a list of all available series.
  }

  @Get(':id')
  getSeriesById() {
    //Retrieves a specific TV series based on the provided ID.
  }


}
