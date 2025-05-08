import { Controller, Get, Post } from '@nestjs/common';
import { SeasonService } from './season.service';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) { }

  @Post()
  addSeason() {
    //Creates a new season for a  series. 
  }

  @Get()
  getAllSeasons() {
    //Retrieves a list of all available series seasons.
  }
}
