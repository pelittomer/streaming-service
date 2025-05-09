import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @Post()
  @UploadImage()
  addProfile(
    @Body() userInputs: CreateProfileDto,
    @Req() req: Request,
    @UploadedFile() uploadedImage: Express.Multer.File
  ) {
    return this.profileService.addProfile(userInputs, req, uploadedImage)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getCurrentProfile(
    @Req() req: Request,
    @Param('id', ParseObjectIdPipe) profileId: Types.ObjectId
  ) {
    return this.profileService.getCurrentProfile(profileId, req)
  }

  @UseGuards(AuthGuard)
  @Get('')
  getUserProfiles(
    @Req() req: Request
  ) {
    return this.profileService.getUserProfile(req)
  }

  @Put()
  updateMyProfile() {
    /*
       Allows the currently authenticated user to update their own profile information.
    */
  }

}
