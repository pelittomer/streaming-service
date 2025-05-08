import { Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getCurrentUser() {
    //Retrieves the information of the currently authenticated user.
  }

  @Put()
  updateCurrentUser() {
    //Allows the currently authenticated user to update their own information.
  }
}
