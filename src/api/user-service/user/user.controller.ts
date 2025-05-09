import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get()
  getCurrentUser(
    @Req() req: Request
  ) {
    return this.userService.getCurrentUser(req)
  }

  @Put()
  updateCurrentUser() {
    //Allows the currently authenticated user to update their own information.
  }
}
