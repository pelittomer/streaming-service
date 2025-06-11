import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { EpisodeService } from './service/episode.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { GetEpisodeDto } from './dto/get-episode.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  addEpisode(@Body() payload: CreateEpisodeDto) {
    return this.episodeService.addEpisode(payload)
  }

  @Get()
  getAllEpisodes(@Query() query: GetEpisodeDto) {
    return this.episodeService.getAllEpisode(query)
  }

  @Get(':id')
  getEpisodeById(@Param('id', ParseObjectIdPipe) episodeId: Types.ObjectId) {
    return this.episodeService.getEpisodeById(episodeId)
  }
}
