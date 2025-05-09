import { Body, Controller, Get, Post, Put, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';

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

  @Get('me')
  getMyProfile() {
    /*
       This endpoint fetches and returns the details of the user making the request.
    */
  }

  @Get('users')
  getUserProfiles() {
    /*
       This endpoint fetches and returns an array containing the profiles of multiple users.
    */
  }

  @Put()
  updateMyProfile() {
    /*
       Allows the currently authenticated user to update their own profile information.
    */
  }

}
