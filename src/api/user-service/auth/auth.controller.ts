import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp(
    @Body() userInputs: RegisterDto
  ) {
    return this.authService.register(userInputs)
  }

  @Post('sign-in')
  signIn(
    @Body() userInputs: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(userInputs, res)
  }

  @Post('sign-out')
  signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(req, res)
  }

  @Get('refresh')
  refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(req, res)
  }
}
