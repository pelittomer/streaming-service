import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './service/user.service';
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
}
