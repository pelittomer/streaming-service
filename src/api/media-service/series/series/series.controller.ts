import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { SeriesService } from './service/series.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateSeriesDto } from './dto/create-series.dto';
import { PartialGetSeriesDto } from './dto/get-series.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UploadImage()
  addSeries(
    @Body() payload: CreateSeriesDto,
    @UploadedFile() uploadedFile: Express.Multer.File
  ) {
    return this.seriesService.addSeries({ payload, uploadedFile })
  }

  @Get()
  getAllSeries(@Query() query: PartialGetSeriesDto) {
    return this.seriesService.getAllSeries(query)
  }

  @Get(':id')
  getSeriesById(@Param('id', ParseObjectIdPipe) seriesId: Types.ObjectId) {
    return this.seriesService.getSeriesById(seriesId)
  }
}
