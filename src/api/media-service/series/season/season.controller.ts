import { Body, Controller, Get, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { SeasonService } from './season.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateSeasonDto } from './dto/create-season.dto';

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
  getAllSeasons() {
    //Retrieves a list of all available series seasons.
  }
}
