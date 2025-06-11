import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { PartialGetSubtitleDto } from './dto/get-subtitle.dto';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('subtitle')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  addSubtitle(
    @Body() userInputs: CreateSubtitleDto,
    @UploadedFile() uploadedFile: Express.Multer.File
  ) {
    return this.subtitleService.addSubtitle(userInputs, uploadedFile)
  }

  @Get()
  getAllSubtitles(@Query() query: PartialGetSubtitleDto) {
    return this.subtitleService.getAllSubtitles(query)
  }

}
