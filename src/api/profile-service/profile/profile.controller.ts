import { Controller, Get, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

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
