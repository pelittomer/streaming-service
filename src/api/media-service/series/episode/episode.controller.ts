import { Controller, Get, Post } from '@nestjs/common';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) { }

  @Post()
  addEpisode() {
    //Adds a new episode to a series season.

  }

  @Get()
  getAllEpisodes() {
    //Retrieves a list of all available series episodes.
  }

  @Get(':id')
  getEpisodeById() {
    //Retrieves a specific series episode based on the provided ID.

  }
}
