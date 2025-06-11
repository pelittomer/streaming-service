import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { SeasonService } from './season.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateSeasonDto } from './dto/create-season.dto';
import { GetSeasonDto } from './dto/get-season.dto';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UploadImage()
  addSeason(
    @Body() userInputs: CreateSeasonDto,
    @UploadedFile() uploadedFile: Express.Multer.File
  ) {
    return this.seasonService.addSeason(userInputs, uploadedFile)
  }

  @Get()
  getAllSeasons(@Query() query: GetSeasonDto) {
    return this.seasonService.getAllSeasons(query)
  }
}
