import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @Post()
  @UploadImage()
  addProfile(
    @Body() payload: CreateProfileDto,
    @Req() req: Request,
    @UploadedFile() uploadedImage: Express.Multer.File
  ) {
    return this.profileService.addProfile({ payload, req, uploadedImage })
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getCurrentProfile(
    @Req() req: Request,
    @Param('id', ParseObjectIdPipe) profileId: Types.ObjectId
  ) {
    return this.profileService.getCurrentProfile({ profileId, req })
  }

  @UseGuards(AuthGuard)
  @Get('')
  getUserProfiles(
    @Req() req: Request
  ) {
    return this.profileService.getUserProfile(req)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UploadImage()
  updateMyProfile(
    @Body() payload: UpdateProfileDto,
    @Req() req: Request,
    @UploadedFile() uploadedImage: Express.Multer.File,
    @Param('id', ParseObjectIdPipe) profileId: Types.ObjectId
  ) {
    return this.profileService.updateMyProfile({ payload, req, uploadedImage, profileId })
  }
}
