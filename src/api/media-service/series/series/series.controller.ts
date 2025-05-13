import { BadRequestException, Body, Controller, Get, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { SeriesService } from './series.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateSeriesDto } from './dto/create-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UploadImage()
  addSeries(
    @Body() userInputs: CreateSeriesDto,
    @UploadedFile() uploadedFile: Express.Multer.File
  ) {
    if (!uploadedFile) {
      throw new BadRequestException('Poster is required')
    }
    return this.seriesService.addSeries(userInputs, uploadedFile)
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
