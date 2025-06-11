import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AudioService } from './service/audio.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAudioDto } from './dto/create-audio.dto';
import { PartialGetAudioDto } from './dto/get-audio.dto';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  addAudio(
    @Body() payload: CreateAudioDto,
    @UploadedFile() uploadedFile: Express.Multer.File
  ) {
    return this.audioService.addAudio({ payload, uploadedFile })
  }

  @Get()
  getAllAudios(
    @Query() query: PartialGetAudioDto
  ) {
    return this.audioService.getAllAudios(query)
  }

}
